// src/pages/Login.tsx
import { animated, useSpring } from "@react-spring/web";
import { Button, Card, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

const Register = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const fade = useSpring({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(50px)",
    from: { opacity: 0, transform: "translateY(50px)" },
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleLogin = async (values: any) => {
    try {
      const { data } = await axios.post(
        "https://bracu-study-portal.onrender.com/api/v1/register",
        values
      );
      console.log(data);
      // Save token and user data in local storage or state
      localStorage.setItem("token", data.token);

      // Navigate to the user dashboard or home page
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleNavigateHome = () => {
    navigate("/"); // Navigate to home page
  };
  const handleNavigateLogin = () => {
    navigate("/login"); // Navigate to home page
  };
  return (
    <div className="login-background">
      <animated.div className="login-container" style={fade}>
        <Card className="login-card" hoverable>
          <h2 className="login-title">Register</h2>
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  type: "string",
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input className="login-input" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input your email!",
                },
              ]}
            >
              <Input className="login-input" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className="login-input" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button">
                Register
              </Button>
            </Form.Item>
          </Form>
          {/* <Button onClick={handleGoogleSignIn} className="login-google-button" type="primary">
            Sign in with Google
          </Button> */}

          <div style={{ marginTop: 20, padding: 5 }}>
            <Button
              onClick={handleNavigateHome}
              className="login-home-button"
              type="default"
            >
              Home
            </Button>
            <Button
              onClick={handleNavigateLogin}
              className="login-home-button"
              type="default"
            >
              Login
            </Button>
          </div>
        </Card>
      </animated.div>
    </div>
  );
};

export default Register;
