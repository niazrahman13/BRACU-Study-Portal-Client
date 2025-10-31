import { Button, Card, Col, Row, Typography } from "antd";
import axios from "axios"; // Import axios to make the request
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const { Title } = Typography;

const CoursesPage = () => {
  const [courses, setCourses] = useState<any[]>([]); // State to hold the courses
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading status

  // Fetch course data from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://bracu-study-portal.onrender.com/api/v1/getCourseData"
        );
        console.log(response.data);
        setCourses(response.data); // Set the fetched data to state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Available Courses
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {courses.map((course: any) => (
          <Col xs={24} sm={12} md={8} lg={6} key={course._id}>
            <Card
              hoverable
              // cover={
              //   // Check if playlistUrls exists and has at least one URL
              //   course.playlistUrls && course.playlistUrls.length > 0
              //     ? (() => {
              //         try {
              //           // Check if the URL is valid before using it
              //           const youtubeUrl = new URL(course.playlistUrls[0]);
              //           const videoId = youtubeUrl.searchParams.get("v");
              //           return `https://img.youtube.com/vi/${videoId}/default.jpg`;
              //         } catch (error) {
              //           console.error("Invalid URL:", course.playlistUrls[0]);
              //           return "/default-image.jpg"; // Fallback to default image if invalid
              //         }
              //       })()
              //     : "/default-image.jpg" // Use default image if no playlist URL exists
              // }
              actions={[
                <Link to={`/course/${course._id}`} key="view">
                  <Button type="primary" block>
                    View Course
                  </Button>
                </Link>,
              ]}
              style={{ borderRadius: "8px", overflow: "hidden" }}
            >
              <Card.Meta
                title={`${course.courseCode} - ${course.courseName}`}
                description={
                  course.materials.length > 0
                    ? "Click to view materials"
                    : "No materials available"
                }
                style={{ textAlign: "center" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CoursesPage;
