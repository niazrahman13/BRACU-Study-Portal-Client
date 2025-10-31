import { Button, Dropdown, Grid, Layout, Menu } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const location = useLocation();
  const screens = useBreakpoint();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get(
          "https://bracu-study-portal.onrender.com/api/v1/authStatus",
          { withCredentials: true }
        );
        setIsAdmin(response.data.user.role === "admin");
      } catch (error) {
        setIsAdmin(false);
      }
    };
    if (token) fetchAuthStatus();
    else setIsAdmin(false);
  }, [token]);

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    setIsAdmin(false);
    dispatch(logout());
    localStorage.removeItem("persist:auth");
    navigate("/");
  };

  // Menu items
  const menuItems = [
    { label: "Home", onClick: () => navigate("/") },
    !isAdmin && { label: "Courses", onClick: () => navigate("/courses") },
    !isAdmin && { label: "Thesis", onClick: () => navigate("/thesis") },
    !isAdmin && { label: "Review", onClick: () => navigate("/review") },
    !isAdmin && { label: "Links", onClick: () => navigate("/importantLinks") },
    token && !isAdmin && { label: "Forum", onClick: () => navigate("/forum") },
    token && !isAdmin && { label: "User Dashboard", onClick: () => navigate("/user") },
    isAdmin && { label: "Course Control", onClick: () => navigate("/courseControl") },
  ].filter(Boolean);

  const dropdownMenu = <Menu items={menuItems} />;

  const headerPadding = screens.md ? "0 80px" : "0 16px";

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(90deg, #001529, #1890ff)",
          padding: headerPadding,
        }}
      >
        {screens.md ? (
          // Desktop Menu
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {menuItems.map((item) => (
              <span
                key={item.label}
                style={{ color: "#fff", cursor: "pointer" }}
                onClick={item.onClick}
                onMouseEnter={(e) => (e.target.style.color = "#ffeaa7")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                {item.label}
              </span>
            ))}
          </div>
        ) : (
          // Mobile Dropdown
          <Dropdown overlay={dropdownMenu} trigger={["click"]}>
            <Button
              style={{ backgroundColor: "#1890ff", color: "#fff", border: "none" }}
            >
              Menu
            </Button>
          </Dropdown>
        )}

        <Button
          onClick={token ? handleLogout : handleLogin}
          style={{
            backgroundColor: "#ffffff",
            color: "#1890ff",
            border: "1px solid #1890ff",
            borderRadius: 6,
            padding: "0 16px",
            height: "36px",
            fontWeight: 500,
          }}
        >
          {token ? "Logout" : "Login"}
        </Button>
      </Header>

      <Content style={{ marginTop: "64px", padding: "24px" }}>
        <div style={{ padding: 24, minHeight: "100vh" }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
