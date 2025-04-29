import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import ParameterSettings from './components/ParameterSettings';
import './App.css';

const { Header, Sider, Content } = Layout;

function App() {
    const [chatHistory, setChatHistory] = useState([]);
    const [parameters, setParameters] = useState({
        model: "deepseek/deepseek-r1/community",
        prompt: "开启深度思考。请用 <think> 和</think> 包裹你的内部推理过程，并将其与最终内容换行分隔，最终回复要简洁自然。",
        max_tokens: 81920,
        temperature: 0.7,
        top_p: 1,
        min_p: 0,
        top_k: 50,
        presence_penalty: 0,
        frequency_penalty: 0,
        repetition_penalty: 1,
    });
    const [loading, setLoading] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ color: 'white', fontSize: '20px' }}>PPIO API Chat</Header>
            <Layout>
                <Sider width={350} style={{ background: '#f0f2f5', padding: '20px' }}>
                    <ParameterSettings parameters={parameters} setParameters={setParameters} />
                </Sider>
                <Content style={{ padding: '20px' }}>
                    <ChatWindow chatHistory={chatHistory} loading={loading} />
                    <MessageInput
                        chatHistory={chatHistory}
                        setChatHistory={setChatHistory}
                        parameters={parameters}
                        setLoading={setLoading}
                    />
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
