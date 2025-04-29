import React, { useState } from 'react';
import { Form, InputNumber, Slider, Input, Select, Collapse } from 'antd';
const { Option } = Select;
const { Panel } = Collapse;

const ParameterSettings = ({ parameters, setParameters }) => {
    const handleChange = (key, value) => {
        setParameters({ ...parameters, [key]: value });
    };

    return (
        <div style={{
            height: 'calc(100vh - 150px)',  // 根据实际需要调整高度
            overflowY: 'auto',
            paddingLeft: 10,
            paddingRight: 15  // 防止滚动条覆盖内容
        }}>
            <Form layout="vertical" colon={false}>
                <Form.Item label="模型选择">
                    <Select value={parameters.model} onChange={(value) => handleChange('model', value)}>
                        <Option value="deepseek/deepseek-r1/community">deepseek/deepseek-r1/community</Option>
                        <Option value="qwen/qwen-2-7b-instruct">qwen/qwen-2-7b-instruct</Option>
                        <Option value="qwen/qwen-2-7b-instruct">qwen/qwen-2-7b-instruct</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Prompt">
                    <Input.TextArea value={parameters.prompt} onChange={(e) => handleChange('prompt', e.target.value)} rows={4} />
                </Form.Item>
                <Form.Item label="最大 Tokens">
                    <InputNumber min={1} value={parameters.max_tokens} onChange={(value) => handleChange('max_tokens', value)} />
                </Form.Item>
                <Form.Item label="温度" style={{ marginBottom: 3 }}>
                    <Slider min={0} max={2} step={0.1} value={parameters.temperature}
                            onChange={(value) => handleChange('temperature', value)}
                            // tooltip={{ formatter: (value) => `${value.toFixed(1)} °C` }} 不用也有提示
                            marks={{
                                0: '0',
                                2: '2',
                                [parameters.temperature]: `${parameters.temperature.toFixed(1)}`, // 显示当前值
                            }}
                    />
                </Form.Item>
                <Form.Item label="Top_p" style={{ marginBottom: 3 }}>
                    <Slider min={0} max={1} step={0.05} value={parameters.top_p}
                            onChange={(value) => handleChange('top_p', value)}
                            marks={{
                                0: '0',
                                1: '1',
                                [parameters.top_p]: `${parameters.top_p.toFixed(2)}`, // 显示当前值
                            }}
                    />
                </Form.Item>
                <Form.Item label="Min_p" style={{ marginBottom: 3 }}>
                    <Slider min={0} max={1} step={0.05} value={parameters.min_p}
                            onChange={(value) => handleChange('min_p', value)}
                            marks={{
                                0: '0',
                                1: '1',
                                [parameters.min_p]: `${parameters.min_p.toFixed(2)}`, // 显示当前值
                            }}
                    />
                </Form.Item>
                <Form.Item label="Top_k" style={{ marginBottom: 3 }}>
                    <Slider min={-1} max={100} step={1} value={parameters.top_k}
                            onChange={(value) => handleChange('top_k', value)}
                            placeholder="-1 表示不限制"
                            marks={{
                                '-1': '-1',
                                100: '100',
                                [parameters.top_k]: `${parameters.top_k.toFixed(0)}`, // 显示当前值
                            }}
                    />
                </Form.Item>
                <Collapse>
                    <Panel header="高级设置" key="1">
                        <Form.Item label="Presence Penalty">
                            <InputNumber min={0} value={parameters.presence_penalty} onChange={(value) => handleChange('presence_penalty', value)} />
                        </Form.Item>
                        <Form.Item label="Frequency Penalty">
                            <InputNumber min={0} value={parameters.frequency_penalty} onChange={(value) => handleChange('frequency_penalty', value)} />
                        </Form.Item>
                        <Form.Item label="Repetition Penalty">
                            <InputNumber min={0} value={parameters.repetition_penalty} onChange={(value) => handleChange('repetition_penalty', value)} />
                        </Form.Item>
                    </Panel>
                </Collapse>
            </Form>
        </div>
    );
};

export default ParameterSettings;
