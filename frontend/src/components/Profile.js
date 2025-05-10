import { useState, useEffect } from 'react';
import { supabase } from '../route/api';
import { Card, Avatar, Typography, Button, Spin } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('获取 session 出错：', error);
        } else if (data.session) {
          setUser(data.session.user);
          setEmail(data.session.user.email);
        }
        setLoading(false);
      }
    fetchSession();
      
    // 监听 auth 状态变更
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      return () => {
        authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <Spin size="large" tip="加载中..." />
    </div>
  );

  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        minHeight: '100vh',
        padding: 24,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <Card
          title={
            <Typography.Title level={3} style={{ margin: 0 }}>
              <UserOutlined style={{ marginRight: 8 }}/>
              个人信息
            </Typography.Title>
          }
          style={{ 
            width: 600,
            borderRadius: 12,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}
        >
          {user ? (
            <div style={{ textAlign: 'center' }}>
              <Avatar 
                size={100} 
                icon={<UserOutlined />} 
                style={{ 
                  backgroundColor: '#1890ff',
                  marginBottom: 24
                }}
              />
              <Typography.Paragraph style={{ fontSize: 18, marginBottom: 24 }}>
                <strong>邮箱：</strong>{email}
              </Typography.Paragraph>
              <Button 
                type="primary" 
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                style={{ 
                  width: 200,
                  height: 40,
                  borderRadius: 6
                }}
              >
                退出登录
              </Button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <Typography.Title level={4} style={{ color: '#666' }}>
                请先登录以查看个人信息
              </Typography.Title>
              <div style={{ marginTop: 24 }}>
                <Link to="/login">
                  <Button type="primary" style={{ marginRight: 16 }}>立即登录</Button>
                </Link>
                <Link to="/signup">
                  <Button>注册账号</Button>
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
  );
}