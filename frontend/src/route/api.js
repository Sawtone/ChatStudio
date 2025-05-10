import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const askAI = async (chatHistory, parameters) => {
    const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messages: [
                { role: 'system', content: parameters.prompt },
                ...chatHistory
            ],
            model: parameters.model,
            temperature: parameters.temperature,
            max_tokens: parameters.max_tokens,
            top_p: parameters.top_p,
            top_k: parameters.top_k,
            min_p: parameters.min_p,
        })
    });
    return response.json();
};
