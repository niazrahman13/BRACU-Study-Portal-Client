import { Card, Col, Row, Typography } from "antd";

const { Title } = Typography;

const importantLinks = [
  { name: "BRAC University Website", url: "https://www.bracu.ac.bd" },
  { name: "Academic Calendar", url: "https://www.bracu.ac.bd/academic-dates" },
  { name: "Announcements", url: "https://www.bracu.ac.bd/news-archive/announcements" },
  { name: "Admission", url: "https://www.bracu.ac.bd/admissions" },
  { name: "BRACU CSE Website", url: "https://cse.sds.bracu.ac.bd/" },
  { name: "CSE Course List", url: "https://cse.sds.bracu.ac.bd/course/list" },
  { name: "Advising Stuffs", url: "https://cse.sds.bracu.ac.bd/advising"},
];

export default function ImportantLinks() {
  return (
    <div style={{ marginTop: 32, padding: "0 16px" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
        Important Links
      </Title>
      <Row gutter={[16, 16]}>
        {importantLinks.map((link, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              onClick={() => window.open(link.url, "_blank")}
              style={{
                borderRadius: 12,
                background: "linear-gradient(135deg, #1890ff, #40a9ff)",
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              bodyStyle={{ padding: 24 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
              }}
            >
              {link.name}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
