import React, { useEffect, useRef } from 'react';
import { List, Avatar, Spin } from 'antd';
import { motion } from 'framer-motion';
import moment from 'moment';

const ChatWindow = ({ chatHistory, loading }) => {
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, loading]);

    return (
        <div style={{ height: '60vh', overflowY: 'auto', padding: '10px', background: '#fff', borderRadius: '5px' }}>
            <List
                dataSource={chatHistory}
                renderItem={(item) => (
                    <List.Item
                        style={{
                            textAlign: item.role === 'user' ? 'right' : 'left',
                            display: 'flex',
                            justifyContent: item.role === 'user' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    style={{
                                        backgroundColor: item.role === 'user' ? '#87d068' : '#1890ff',
                                        alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    {item.role === 'user' ? 'U' : 'AI'}
                                </Avatar>
                            }
                            title={
                                <>
                                    {item.role === 'user' ? '你' : 'AI'}
                                    <span style={{ fontSize: '12px', color: '#888', marginLeft: '8px' }}>
                                        {moment(item.timestamp).format('HH:mm:ss')}
                                    </span>
                                </>
                            }
                            description={
                                <motion.div
                                    initial={{ opacity: 0, x: item.role === 'user' ? 50 : -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                    style={{
                                        display: 'inline-block',
                                        backgroundColor: item.role === 'user' ? '#87d068' : '#1890ff',
                                        color: '#fff',
                                        padding: '8px 12px',
                                        borderRadius: '15px',
                                        maxWidth: '80%',
                                    }}
                                >
                                    {item.content}
                                </motion.div>
                            }
                        />
                    </List.Item>
                )}
            />
            {loading && (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                    <Spin tip="AI 正在思考..." />
                </div>
            )}
            <div ref={endRef} />
        </div>
    );
};

export default ChatWindow;
