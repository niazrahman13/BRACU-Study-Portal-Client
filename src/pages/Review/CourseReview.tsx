import { Button, Card, Col, Grid, Row, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;

const CourseReview = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const screens = useBreakpoint(); // AntD responsive breakpoints

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://bracu-study-portal.onrender.com/api/v1/courses");
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: screens.xs ? "10px" : "20px" }}>
      <h1 style={{ marginBottom: "30px", textAlign: "center" }}>Course Reviews</h1>
      <Row gutter={[16, 16]} justify="center">
        {courses.map((course) => (
          <Col
            key={course._id}
            xs={24} // mobile full width
            sm={12} // small tablet 2 per row
            md={8} // medium devices 3 per row
            lg={6} // large desktop 4 per row
          >
            <Card
              title={`${course.courseCode} - ${course.courseName}`}
              style={{ textAlign: "center" }}
            >
              <Link to={`/review/${course._id}`}>
                <Button
                  type="primary"
                  style={{
                    marginTop: "10px",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                >
                  View Reviews
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CourseReview;
