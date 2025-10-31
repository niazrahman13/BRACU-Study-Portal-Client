import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Sider, Content } = Layout;

const UserDashboard = () => {
  // আগের মত Firebase auth ব্যবহার না করে
  // এখানে শুধু dummy user state (future এ তুমি backend auth বসাতে পারো)
  const [user] = useState<any>(null);
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={256}
        theme="dark"
        style={{
          background: '#001529',
          height: '100vh',
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['/user/profile']}
          selectedKeys={[location.pathname]}
          style={{
            flex: 1,
            overflow: 'auto',
            background: '#001529',
            color: '#fff',
          }}
        >
          <Menu.Item key="/user/profile">
            <Link to="profile" style={{ color: '#fff' }}>
              User Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="/user/todo">
            <Link to="todo" style={{ color: '#fff' }}>
              To-Do List
            </Link>
          </Menu.Item>
          <Menu.Item key="/user/calendar">
            <Link to="calendar" style={{ color: '#fff' }}>
              Calendar
            </Link>
          </Menu.Item>
          <Menu.Item key="/user/postIssues">
            <Link to="postIssues" style={{ color: '#fff' }}>
              Forum Post
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          {/* User থাকলে দেখাবে */}
          {user && (
            <div style={{ marginBottom: '16px', color: '#fff' }}>
              Welcome, {user.email}
            </div>
          )}

          {/* Nested route render হবে */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
