import { Card, Col, List, Row, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

const Course = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `https://bracu-study-portal.onrender.com/api/v1/getCourseData/${id}`
          );
          setCourse(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching course:", error);
          setLoading(false);
        }
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ fontSize: "28px", color: "#1890ff" }}>
        Course: {course.courseName}
      </Title>

      <Row gutter={16}>
        {course.playlistUrls.map((playlist: { url: string; name: string }) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={5}
            key={playlist.url}
            style={{ marginBottom: "16px" }}
          >
            <Card
              hoverable
              onClick={() => {
                navigate(`/playlist/${encodeURIComponent(playlist.url)}`);
              }}
            >
              <Card.Meta title={playlist.name} />
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: "24px" }}>
        <Title level={3}>Course Materials</Title>
        <List
          bordered
          dataSource={course.materials}
          renderItem={(item) => (
            <List.Item>
              <a href={item} target="_blank" rel="noopener noreferrer">
                {item}
              </a>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Course;
