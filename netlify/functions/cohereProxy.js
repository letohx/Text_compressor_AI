const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiKey = process.env.COHERE_API_KEY; // Убедись, что ключ API хранится в переменной окружения

  if (!apiKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'API key is missing' }),
    };
  }

  const requestBody = JSON.parse(event.body);

  try {
    const response = await fetch('https://api.cohere.ai/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: requestBody.prompt,
        model: 'xlarge',
      }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
