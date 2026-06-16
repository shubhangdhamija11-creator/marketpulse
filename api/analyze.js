export default async function handler(req, res) {
  // 1. Set CORS headers so your frontend can talk to this backend file
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Fetch your API Key securely from Vercel's environment settings
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const { tickers, promptText } = req.body;

  try {
    const response = await fetch(`https://generatelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${promptText}\n\nAnalyze these specific tickers now: ${tickers.join(", ")}` }]
        }],
        generationConfig: { temperature: 0.2 }
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
