import React, { useState } from 'react';
import { supabase } from '../route/api';
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    MobileOutlined,
    SafetyOutlined,
  } from '@ant-design/icons';  
import { Button, Col, Form, Input, Row, Select, theme } from 'antd';
import { ProConfigProvider } from '@ant-design/pro-components';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Signup = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
         email, password, options: { data: { display_name: nickname, phone: phoneNumber } } 
        });
    if (error) setError(error.message);
    else alert('注册成功，请检查您的邮箱以验证账户');
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="1">+1</Option>
      </Select>
    </Form.Item>
  );

  return (
    <ProConfigProvider hashed={false}>
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: token.colorBgContainer,
        }}
      >
        <div
          style={{
            width: 600,
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: 32,
            display: 'flex',               
            flexDirection: 'column',       
            justifyContent: 'center',       
            alignItems: 'center',          
            }}
        >
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>注册账号</h2>
      <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={handleSignup}
      initialValues={{ prefix: '86' }}
      style={{ maxWidth: 600, width: '100%' }}
      scrollToFirstError
    >
      <Form.Item
        name="nickname"
        label="昵称"
        rules={[{ required: true, message: '请输入昵称!', whitespace: true }]}
      >
        <Input
            prefix={<UserOutlined />}
            placeholder="请输入昵称"
            size="large"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
        />
      </Form.Item>
      
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: 'email',
            message: '邮箱格式不正确!',
          },
          {
            required: true,
            message: '请输入邮箱!',
          },
        ]}
      >
        <Input
            prefix={<MailOutlined />}
            placeholder="请输入邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
        hasFeedback
      >
        <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="large"
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请确认密码!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
            prefix={<LockOutlined />}
            placeholder="请再次输入密码"
            size="large"
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="手机号"
        rules={[{ required: true, message: '请输入手机号!' }]}
      >
        <Input
            prefix={<MobileOutlined />}
            addonBefore={prefixSelector}
            placeholder="请输入手机号"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            size="large"
            style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="验证码">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              <Input
                prefix={<SafetyOutlined />}
                placeholder="请输入验证码"
                size="large"
                />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>获取验证码</Button>
          </Col>
        </Row>
      </Form.Item>
        
        <Form.Item {...tailFormItemLayout}
            style={{
            marginTop: '-25px',
            marginBottom: '-1px',
            }}
        >
        <Link 
              to="/login" 
              style={{ 
                float: 'right',
                marginBottom: '10px',
              }}
            >
              已有帐号？立即登录
            </Link>
        </Form.Item>  

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit"
          style={{
            width: '90%', 
            height: 44,   
            borderRadius: 6, 
            fontSize: 18, 
            marginLeft: '33%',
          }}
          >
          注册
        </Button>
      </Form.Item>
      
    </Form>
    </div>
    </div>
  </ProConfigProvider>
    
  );
};

export default Signup;