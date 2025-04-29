import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PPIO_API_URL = "https://api.ppinfra.com/v3/openai";
const PPIO_API_KEY = process.env.PPIO_API_KEY;

app.post('/ask', async (req, res) => {
    // 测试：
    // console.log("收到请求：", req.body); // 输出前端发来的数据
    // console.log("PPIO_API_KEY:", process.env.PPIO_API_KEY);

    const { messages, model, temperature, max_tokens, top_p, top_k, min_p, stop } = req.body;

    // 基本参数检查
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: '请求中缺少 messages 数组' });
    }
    if (!model) {
        return res.status(400).json({ error: '请求中缺少 model 参数' });
    }

    // 构造 API 请求负载，采用前端传递的参数，如果某些参数未传则使用默认值
    const payload = {
        model,
        messages,
        temperature: temperature !== undefined ? temperature : 0.7,
        max_tokens: max_tokens || 512,
        top_p: top_p !== undefined ? top_p : 1,
        top_k: top_k !== undefined ? top_k : 50,
        min_p: min_p !== undefined ? min_p : 0,
        stream: false
    };

    try {
        const response = await fetch(`${PPIO_API_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PPIO_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        // 检查返回值是否符合预期
        if (response.ok && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
            res.json({ answer: data.choices[0].message.content });
        } else {
            res.status(response.status).json({ error: 'API 返回格式异常', details: data });
        }
    } catch (error) {
        res.status(500).json({ error: 'API 调用失败', details: error.message });
    }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));