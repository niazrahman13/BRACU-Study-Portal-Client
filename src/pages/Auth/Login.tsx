import { animated, useSpring } from "@react-spring/web";
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/auth/authSlice"; // Import your Redux action
import "./Login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Access dispatch
  const [loaded, setLoaded] = useState(false);

  const fade = useSpring({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(50px)",
    from: { opacity: 0, transform: "translateY(50px)" },
  });

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleNavigateHome = () => {
    navigate("/"); // Navigate to home page
  };

  const handleEmailPasswordLogin = async (values: any) => {
    try {
      const response = await axios.post(
        "https://bracu-study-portal.onrender.com/api/v1/login",
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );

      const { token, user } = response.data;
      const decodedToken = jwtDecode(response.data.token);

      dispatch(
        setUser({
          token,
          user,
        })
      );
      message.success("Login successful!");

      if (decodedToken.role === "admin") {
        navigate("/adminDashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in with email and password:", error);
      message.error("Login failed!");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Redirect to Register page
  };

  const handleForgotPassword = () => {
    navigate("/forgetPassword"); // Redirect to Forgot Password page
  };

  return (
    <div className="login-background">
      <animated.div className="login-container" style={fade}>
        <Card className="login-card" hoverable>
          <h2 className="login-title">Login</h2>
          <Form layout="vertical" onFinish={handleEmailPasswordLogin}>
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
                Login
              </Button>
              <Button
                type="default"
                onClick={handleRegisterRedirect}
                className="login-button"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div style={{ marginTop: 10 }}>
            <Button onClick={handleForgotPassword} className="login-link">
              Forgot Password?
            </Button>
          </div>
          <div style={{ marginTop: 20 }}>
            <Button
              onClick={handleNavigateHome}
              className="login-home-button"
              type="default"
            >
              Go to Home
            </Button>
          </div>
        </Card>
      </animated.div>
    </div>
  );
};

export default Login;
