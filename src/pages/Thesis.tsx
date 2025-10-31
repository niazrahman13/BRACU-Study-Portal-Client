import { Card, Col, Row, Typography } from "antd";

const { Title } = Typography;

const thesisLinks = [
  {
    name: "Thesis Template & Guidelines",
    url: "https://www.bracu.ac.bd/thesis-template-and-guidelines",
  },
  {
    name: "Supervisors",
    url: "https://cse.sds.bracu.ac.bd/thesis/supervising/list",
  },
  {
    name: "Lbrary Soft Copy Submision",
    url: "https://library.bracu.ac.bd/thesis-internship-report-submission",
  }
  
];

const Thesis = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ marginBottom: 24, textAlign: "center" }}>
        Thesis Section
      </Title>

      <Row gutter={[16, 16]} justify="center">
        {thesisLinks.map((link, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              onClick={() => window.open(link.url, "_blank")}
              style={{
                borderRadius: 12,
                background: "linear-gradient(135deg, #36cfc9, #73d13d)",
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
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 4px 20px rgba(0,0,0,0.1)";
              }}
            >
              {link.name}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Thesis;
