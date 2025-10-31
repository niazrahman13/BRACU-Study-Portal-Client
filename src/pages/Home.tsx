import { Card, Col, Divider, Row, Typography } from "antd";
import { motion } from "framer-motion";
import { FaLightbulb } from "react-icons/fa";
import CGPACalculator from "./CGPACalculator"; // path ঠিক মতো adjust করো

const { Title, Paragraph } = Typography;

const youtubeVideos = [
  {
    title: "BRAC University Connect Explained",
    url: "https://youtu.be/Kf3xqzT5-qk?si=P8oA3x62OYy8UiOv",
  },
  {
    title: "BRACU CP Workshop",
    url: "https://youtube.com/playlist?list=PLhzrCscPbco86dcPiF1drdTH2QuSDzt3r&si=1v-6KMu5Puv1j7Cx",
  },
  {
    title: "Thesis Template Guideline (BracU)",
    url: "https://www.youtube.com/watch?v=PnW-JHSn4eA",
  },
];

const Home = () => {
  return (
    <div style={{ padding: "24px", position: "relative", overflow: "hidden" }}>
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-150px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #6c5ce7, #00cec9)",
          opacity: 0.25,
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #fd79a8, #ffeaa7)",
          opacity: 0.25,
          filter: "blur(120px)",
          zIndex: 0,
        }}
      />

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Title
          level={1}
          style={{
            textAlign: "center",
            marginBottom: "16px",
            background: "linear-gradient(90deg,#6c5ce7,#00b894)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Welcome to the Study Portal
        </Title>
        <Paragraph
          style={{
            textAlign: "center",
            fontSize: "18px",
            maxWidth: "720px",
            margin: "0 auto 50px auto",
            lineHeight: "1.7",
            color: "#555",
          }}
        >
          Explore BRAC University's CSE courses with curated videos, tutorials,
          and blogs. Access structured materials, practical examples, and
          interactive content designed to help you learn efficiently and stay
          ahead in your studies.
        </Paragraph>
      </motion.div>

      <Divider style={{ borderColor: "#ddd" }} />

      {/* Featured Videos */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "30px",
            background: "linear-gradient(90deg,#6c5ce7,#00cec9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🎥 Featured Videos
        </Title>

        {/* First Row - 2 Cards */}
        <Row gutter={[24, 24]} justify="center">
          {youtubeVideos.slice(0, 2).map((video, idx) => (
            <Col key={idx} xs={24} sm={12} md={8}>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "16px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    cursor: "pointer",
                    minHeight: "200px",
                    textAlign: "center",
                  }}
                  bodyStyle={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => window.open(video.url, "_blank")}
                >
                  <FaLightbulb size={42} style={{ marginBottom: "14px", color: "#6c5ce7" }} />
                  <Title level={4} style={{ marginBottom: 0 }}>
                    {video.title}
                  </Title>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Second Row - 1 Card Center */}
        <Row gutter={[24, 24]} justify="center" style={{ marginTop: "24px" }}>
          <Col xs={24} sm={12} md={8}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card
                hoverable
                style={{
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  minHeight: "200px",
                  textAlign: "center",
                }}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => window.open(youtubeVideos[2].url, "_blank")}
              >
                <FaLightbulb size={42} style={{ marginBottom: "14px", color: "#6c5ce7" }} />
                <Title level={4} style={{ marginBottom: 0 }}>
                  {youtubeVideos[2].title}
                </Title>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
            {/* Calendar Section */}
      <Divider style={{ borderColor: "#ddd", marginTop: "50px" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{ textAlign: "center", marginTop: "40px", position: "relative", zIndex: 1 }}
      >
        <Title
          level={2}
          style={{
            background: "linear-gradient(90deg,#00b894,#6c5ce7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
          }}
        >
          🗓️ Calendar
        </Title>

        <Paragraph
          style={{
            fontSize: "16px",
            color: "#555",
            maxWidth: "700px",
            margin: "0 auto 30px auto",
            lineHeight: "1.6",
          }}
        >
          Access the official BRACU Thesis Calendar to track all submission and defense
          deadlines. You can view or download it from the link below.
        </Paragraph>

        {/* Google Drive Link */}
        <motion.a
          href="https://www.bracu.ac.bd/sites/default/files/uploads/2025/10/21/Year%20Planner%202025-Version-Final-summer25v2.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          style={{
            display: "inline-block",
            padding: "10px 22px",
            background: "linear-gradient(90deg,#6c5ce7,#00cec9)",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "500",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          📎 View on Google Drive
        </motion.a>

                    {/* CGPA Section */}
        <Divider style={{ borderColor: "#ddd", marginTop: "50px" }} />

          <Title
          level={2}
          style={{
            background: "linear-gradient(90deg,#00b894,#6c5ce7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
          }}
        >
          🎓 BRACU CGPA Calculator
        </Title>

        <Paragraph
          style={{
            fontSize: "16px",
            color: "#555",
            maxWidth: "700px",
            margin: "0 auto 30px auto",
            lineHeight: "1.6",
          }}
        >
          Use the BRACU CGPA Calculator to quickly compute your semester or cumulative CGPA. Enter your course credits and grade points, and get accurate results instantly. You can add multiple courses and calculate your CGPA with ease.
        </Paragraph>

        <CGPACalculator />
      </motion.div>
    </div>
  );
};

export default Home;
