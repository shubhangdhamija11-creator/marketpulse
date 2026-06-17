export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }

  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: { message: 'Missing prompt in request body' } });
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 }
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(response.status).json({ error: { message: data.error.message } });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return res.status(502).json({ error: { message: 'No text returned from model.' } });
    }

    // Wrap in the same shape screener.html already expects
    res.status(200).json({ content: [{ text }] });
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
}
