import axios from "axios";
import React, { useEffect, useState } from "react";
import { selectUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import "./UserProfile.css"; // Import CSS

const UserProfile = () => {
  const user = useAppSelector(selectUser);
  const [editMode, setEditMode] = useState<
    "email" | "password" | "name" | null
  >(null); // Add "name" edit mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://bracu-study-portal.onrender.com/api/v1/user/${user.email}`)
        .then((response) => {
          setFormData({
            name: response.data.name,
            email: response.data.email,
            password: "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          alert("Failed to fetch user details.");
        });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleNameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`https://bracu-study-portal.onrender.com/api/v1/user/${user.email}`, {
        name: formData.name,
      });
      alert("Name updated successfully!");
      setEditMode(null);
    } catch (error) {
      console.error("Error updating name:", error);
      alert("Failed to update name.");
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://bracu-study-portal.onrender.com/api/v1/user/verify-password`,
        { email: formData.email, password: formData.password }
      );
      if (response.data.success) {
        await axios.put(`https://bracu-study-portal.onrender.com/api/v1/user/${user.email}`, {
          email: formData.email,
        });
        alert("Email updated successfully!");
        setEditMode(null);
      } else {
        alert("Password incorrect. Email not updated.");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      alert("Failed to update email.");
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `https://bracu-study-portal.onrender.com/api/v1/user/change-password`,
        {
          email: formData.email,
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        }
      );
      if (response.data.success) {
        alert("Password updated successfully!");
        setEditMode(null);
      } else {
        alert("Old password incorrect. Password not updated.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {editMode === "email" ? (
        <form onSubmit={handleEmailChange} className="form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Current Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              Update Email
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setEditMode(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : editMode === "password" ? (
        <form onSubmit={handlePasswordUpdate} className="form">
          <div className="form-group">
            <label>Old Password:</label>
            <input
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              Update Password
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setEditMode(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : editMode === "name" ? (
        <form onSubmit={handleNameChange} className="form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-primary">
              Update Name
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setEditMode(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="user-details">
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <div className="action-buttons">
            <button className="btn-primary" onClick={() => setEditMode("name")}>
              Edit Name
            </button>
            <button
              className="btn-primary"
              onClick={() => setEditMode("email")}
            >
              Edit Email
            </button>
            <button
              className="btn-primary"
              onClick={() => setEditMode("password")}
            >
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
