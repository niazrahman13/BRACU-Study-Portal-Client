import { Button, Form, Input, message } from 'antd';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      message.success('Password reset email sent!');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      message.error('Failed to send password reset email.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Forgot Password</h2>
      <Form layout="vertical" onFinish={handlePasswordReset}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
            Send Reset Email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
