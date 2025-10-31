import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.users);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching data");
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
