const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const response = await fetch("https://api.cohere.ai/generate", {
    method: "POST",
    headers: {
      "Authorization": `Bearer YOUR_COHERE_API_KEY`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command-xlarge-nightly",
      prompt: "Пример запроса",
      max_tokens: 100,
      temperature: 0.7
    })
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
