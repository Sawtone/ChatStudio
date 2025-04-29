import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import { askAI } from '../api';

const { TextArea } = Input;

const MessageInput = ({ chatHistory, setChatHistory, parameters, setLoading }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        const newHistory = [...chatHistory, { 
            role: 'user', 
            content: inputValue, 
            timestamp: Date.now() // 添加固定时间戳 
        }];
        setChatHistory(newHistory);
        setInputValue("");
        setLoading(true);
        try {
            const response = await askAI(newHistory, parameters);
            setChatHistory([...newHistory, { 
                role: 'assistant', 
                content: response.answer,
                timestamp: Date.now() // 添加固定时间戳 
            }]);
        } catch (error) {
            setChatHistory([...newHistory, { 
                role: 'assistant', 
                content: "请求出错，请重试。" ,
                timestamp: Date.now() // 添加固定时间戳 
            }]);
        }
        setLoading(false);
    };

    return (
        <Space style={{ marginTop: '10px', width: '100%' }} direction="vertical">
            <TextArea
                rows={4}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="输入消息..."
                style={{ borderRadius: '10px', padding: '10px', fontSize: '16px' }}
            />
            <Button type="primary" onClick={handleSend} style={{ borderRadius: '5px', fontSize: '16px' }}>发送</Button>
        </Space>
    );
};

export default MessageInput;
