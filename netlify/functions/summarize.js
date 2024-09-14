// summarize.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const COHERE_API_KEY = process.env.COHERE_API_KEY;

    const { text } = JSON.parse(event.body);
    const prompt = `Retell the following text in a short sentence of no more than 10 words:\n\n"${text}"`;

    try {
        const response = await fetch('https://api.cohere.ai/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${COHERE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'command-xlarge-nightly',
                prompt: prompt,
                max_tokens: 50,
                temperature: 0.7
            })
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ summary: data.text.trim() })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ошибка при сокращении текста.' })
        };
    }
};
