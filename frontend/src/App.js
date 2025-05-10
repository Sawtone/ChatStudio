import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

import './App.css';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import ParameterSettings from './components/ParameterSettings';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';

const { Header, Sider, Content } = Layout;

function App() {
    const [chatHistory, setChatHistory] = useState([]);
    const [parameters, setParameters] = useState({
        model: "deepseek/deepseek-r1/community",
        prompt: "开启深度思考。请用 <think> 和</think> 包裹你的内部推理过程，并将其与最终内容换行分隔，最终回复要简洁自然。",
        max_tokens: 4000,  // 81920
        temperature: 0.7,
        top_p: 1,
        min_p: 0,
        top_k: 50,
        presence_penalty: 0,
        frequency_penalty: 0,
        repetition_penalty: 1,
    });
    const [loading, setLoading] = useState(false);

    // 从 Ant Design v4.23 开始，Dropdown 不再使用 overlay，而是改为使用 menu 属性
    // const userMenu = (
    //     <Menu>
    //         <Menu.Item key="profile">
    //             <Link to="/profile">个人信息</Link>
    //         </Menu.Item>
    //     </Menu>
    // );
    const userMenuItems = [
        {
          key: 'profile',
          label: <Link to="/profile">个人信息</Link>,
        },
      ];
    
    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontSize: '20px' }}>
                    <div>
                        <Link to="/" style={{ color: 'white' }}>
                            <RobotOutlined style={{ marginRight: 10, fontSize: 18 }}/>
                            Sawtone's Chat Studio
                        </Link>
                    </div>
                    <div>
                        <Button type="link">
                            <Link to="/signup" style={{ color: 'white' }}>Sign Up</Link>
                        </Button>
                        <Button type="link">
                            <Link to="/login" style={{ color: 'white' }}>Log In</Link>
                        </Button>
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                            <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer', marginLeft: 16 }} />
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider width={350} style={{ background: '#f0f2f5', padding: '20px' }}>
                        <ParameterSettings parameters={parameters} setParameters={setParameters} />
                    </Sider>
                    <Content style={{ padding: '20px' }}>
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <ChatWindow chatHistory={chatHistory} loading={loading} />
                                    <MessageInput
                                        chatHistory={chatHistory}
                                        setChatHistory={setChatHistory}
                                        parameters={parameters}
                                        setLoading={setLoading}
                                    />
                                </>
                            } />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>

        </Router>
        
    );
}

export default App;
