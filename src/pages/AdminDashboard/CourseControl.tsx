import axios from "axios";
import { useEffect, useState } from "react";
import "./CourseControl.css"; // Importing the CSS file

function CourseControl() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    playlistUrls: [{ url: "", name: "" }],
    materials: [""],
  });

  useEffect(() => {
    axios
      .get("https://bracu-study-portal.onrender.com/api/v1/getCourseData")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddCourse = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
    setCurrentCourseId(null);
    setFormData({
      courseCode: "",
      courseName: "",
      playlistUrls: [{ url: "", name: "" }],
      materials: [""],
    });
  };

  const handleEditCourse = (course) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setCurrentCourseId(course._id);
    setFormData({
      courseCode: course.courseCode,
      courseName: course.courseName,
      playlistUrls: course.playlistUrls.length
        ? course.playlistUrls
        : [{ url: "", name: "" }],
      materials: course.materials.length ? course.materials : [""],
    });
  };

  const handlePlaylistChange = (index, field, value) => {
    const newPlaylists = [...formData.playlistUrls];
    newPlaylists[index][field] = value;
    setFormData({ ...formData, playlistUrls: newPlaylists });
  };

  const handleAddPlaylist = () => {
    setFormData({
      ...formData,
      playlistUrls: [...formData.playlistUrls, { url: "", name: "" }],
    });
  };

  const handleMaterialChange = (index, value) => {
    const newMaterials = [...formData.materials];
    newMaterials[index] = value;
    setFormData({ ...formData, materials: newMaterials });
  };

  const handleAddMaterial = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, ""],
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      courseCode: formData.courseCode,
      courseName: formData.courseName,
      playlistUrls: formData.playlistUrls.filter(
        (p) => p.url.trim() !== "" && p.name.trim() !== ""
      ),
      materials: formData.materials.filter((m) => m.trim() !== ""),
    };

    if (isEditMode) {
      axios
        .put(
          `https://bracu-study-portal.onrender.com/api/v1/updateCourseData/${currentCourseId}`,
          dataToSend
        )
        .then(() => refreshCourses())
        .catch((err) => console.log(err));
    } else {
      axios
        .post("https://bracu-study-portal.onrender.com/api/v1/addCourseData", dataToSend)
        .then(() => refreshCourses())
        .catch((err) => console.log(err));
    }
  };

  const refreshCourses = () => {
    setIsModalOpen(false);
    setFormData({
      courseCode: "",
      courseName: "",
      playlistUrls: [{ url: "", name: "" }],
      materials: [""],
    });
    axios
      .get("https://bracu-study-portal.onrender.com/api/v1/getCourseData")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios
        .delete(`https://bracu-study-portal.onrender.com/api/v1/deleteCourse/${id}`)
        .then(() => refreshCourses())
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="course-control">
      <button className="add-course-btn" onClick={handleAddCourse}>
        Add Course
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              ×
            </button>
            <h2>{isEditMode ? "Edit Course" : "Add New Course"}</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="courseCode"
                placeholder="Course Code"
                value={formData.courseCode}
                onChange={(e) =>
                  setFormData({ ...formData, courseCode: e.target.value })
                }
                required
              />
              <input
                type="text"
                name="courseName"
                placeholder="Course Name"
                value={formData.courseName}
                onChange={(e) =>
                  setFormData({ ...formData, courseName: e.target.value })
                }
                required
              />

              <h4>Playlists</h4>
{formData.playlistUrls.map((p, idx) => (
  <div key={idx} style={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
    <input
      type="text"
      placeholder="Playlist URL"
      value={p.url}
      onChange={(e) =>
        handlePlaylistChange(idx, "url", e.target.value)
      }
    />
    <input
      type="text"
      placeholder="Playlist Name"
      value={p.name}
      onChange={(e) =>
        handlePlaylistChange(idx, "name", e.target.value)
      }
    />
    <button
      type="button"
      onClick={() => {
        const newPlaylists = formData.playlistUrls.filter(
          (_, i) => i !== idx
        );
        setFormData({ ...formData, playlistUrls: newPlaylists });
      }}
    >
      ✕
    </button>
  </div>
))}
<button type="button" onClick={handleAddPlaylist}>
  + Add Playlist
</button>

<h4>Materials</h4>
{formData.materials.map((m, idx) => (
  <div key={idx} style={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
    <input
      type="text"
      placeholder="Material URL"
      value={m}
      onChange={(e) => handleMaterialChange(idx, e.target.value)}
    />
    <button
      type="button"
      onClick={() => {
        const newMaterials = formData.materials.filter((_, i) => i !== idx);
        setFormData({ ...formData, materials: newMaterials });
      }}
    >
      ✕
    </button>
  </div>
))}
<button type="button" onClick={handleAddMaterial}>
  + Add Material
</button>


              <button type="submit">
                {isEditMode ? "Update Course" : "Add Course"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="course-list">
        {courses.map((course) => (
          <div key={course._id} className="course-item">
            <div className="course-info">
              <h3>{course.courseName}</h3>
              <p>Code: {course.courseCode}</p>
            </div>
            <div className="course-actions">
              <button onClick={() => handleEditCourse(course)}>Edit</button>
              <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseControl;
