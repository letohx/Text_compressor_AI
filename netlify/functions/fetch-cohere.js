const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const apiKey = process.env.COHERE_API_KEY; // Использование переменной окружения

    const { model, prompt, max_tokens, temperature } = JSON.parse(event.body);

    try {
        const response = await fetch('https://api.cohere.ai/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                max_tokens: max_tokens,
                temperature: temperature
            })
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' })
        };
    }
};
