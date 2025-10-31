import { motion } from "framer-motion";
import { useState } from "react";

const gradeScale = [
  { min: 4.0, max: 4.1, letter: "A+" },
  { min: 3.7, max: 4.0, letter: "A-" },
  { min: 3.3, max: 3.7, letter: "B+" },
  { min: 3.0, max: 3.3, letter: "B" },
  { min: 2.7, max: 3.0, letter: "B-" },
  { min: 2.3, max: 2.7, letter: "C+" },
  { min: 2.0, max: 2.3, letter: "C" },
  { min: 1.7, max: 2.0, letter: "C-" },
  { min: 1.3, max: 1.7, letter: "D+" },
  { min: 1.0, max: 1.3, letter: "D" },
  { min: 0.7, max: 1.0, letter: "D-" },
  { min: 0.0, max: 0.7, letter: "F" },
];

function getLetterGrade(point) {
  const scale = gradeScale.find(s => point >= s.min && point < s.max);
  return scale ? scale.letter : "-";
}

export default function CGPACalculator() {
  const [courses, setCourses] = useState([{ name: "", credit: "", cg: "" }]);
  const [cgpa, setCGPA] = useState(null);
  const [warning, setWarning] = useState("");

  const handleChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
    // Clear warning when user starts typing
    if (warning) setWarning("");
  };

  const addCourse = () => {
    setCourses([...courses, { name: "", credit: "", cg: "" }]);
    setWarning("");
  };

  const reset = () => { 
    setCourses([{ name: "", credit: "", cg: "" }]); 
    setCGPA(null); 
    setWarning("");
  };

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;
    let hasEmptyFields = false;

    // Check for empty required fields
    courses.forEach(c => {
      if (!c.credit || !c.cg) {
        hasEmptyFields = true;
      }
    });

    if (hasEmptyFields) {
      setWarning("Please fill in all Credit and CG Point fields before calculating.");
      setCGPA(null);
      return;
    }

    // Calculate CGPA
    courses.forEach(c => {
      const credit = parseFloat(c.credit);
      const point = parseFloat(c.cg);
      if (!isNaN(credit) && !isNaN(point)) {
        totalCredits += credit;
        totalPoints += credit * point;
      }
    });

    if (totalCredits === 0) {
      setWarning("Please enter valid credit hours and CG points.");
      return;
    }

    setWarning("");
    setCGPA((totalPoints / totalCredits).toFixed(2));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        padding: "24px",
        maxWidth: "900px",
        margin: "50px auto",
        borderRadius: "16px",
        boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
        background: "#fff",
        position: "relative",
        zIndex: 1,
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#555" }}>
        Enter your courses and CG points. Leave rows empty if not needed.
      </h3>

      {warning && (
        <div style={{
          padding: "12px",
          marginBottom: "20px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          borderRadius: "8px",
          color: "#856404",
          textAlign: "center",
          fontWeight: "500"
        }}>
          ⚠️ {warning}
        </div>
      )}

      {courses.map((c, i) => (
        <div key={i} style={{
          display: "flex",
          gap: "10px",
          marginBottom: "12px",
          alignItems: "center",
        }}>
          <input
            type="text"
            placeholder="Course Name"
            value={c.name}
            onChange={e => handleChange(i, "name", e.target.value)}
            style={{ flex: 2, padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
          />
          <input
            type="number"
            placeholder="Credits *"
            value={c.credit}
            onChange={e => handleChange(i, "credit", e.target.value)}
            style={{ 
              flex: 1, 
              padding: "8px", 
              borderRadius: "8px", 
              border: !c.credit && warning ? "1px solid #ff6b6b" : "1px solid #ccc" 
            }}
          />
          <input
            type="number"
            step="0.1"
            placeholder="CG Point *"
            value={c.cg}
            onChange={e => handleChange(i, "cg", e.target.value)}
            style={{ 
              flex: 1, 
              padding: "8px", 
              borderRadius: "8px", 
              border: !c.cg && warning ? "1px solid #ff6b6b" : "1px solid #ccc" 
            }}
          />
          <span style={{ flex: 0.5, textAlign: "center", fontWeight: "bold" }}>
            {c.cg ? getLetterGrade(parseFloat(c.cg)) : "-"}
          </span>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "25px" }}>
        <button
          onClick={addCourse}
          style={{ padding: "10px 20px", borderRadius: "8px", backgroundColor: "#6c5ce7", color: "#fff", fontWeight: "500", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
        >
          + Add Course
        </button>
        <button
          onClick={calculateCGPA}
          style={{ padding: "10px 20px", borderRadius: "8px", backgroundColor: "#00cec9", color: "#fff", fontWeight: "500", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
        >
          Calculate CGPA
        </button>
        <button
          onClick={reset}
          style={{ padding: "10px 20px", borderRadius: "8px", backgroundColor: "#fd79a8", color: "#fff", fontWeight: "500", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
        >
          Reset
        </button>
      </div>

      {cgpa && (
        <div style={{
          marginTop: "30px",
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "bold",
          color: "#6c5ce7"
        }}>
          Your CGPA: {cgpa}
        </div>
      )}
    </motion.div>
  );
}