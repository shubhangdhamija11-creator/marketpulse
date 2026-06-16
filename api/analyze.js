export default async function handler(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST requests allowed"
    });
  }

  try {

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY not found in environment variables"
      });
    }

    const { tickers, promptText } = req.body;

    if (!tickers || !Array.isArray(tickers)) {
      return res.status(400).json({
        error: "Tickers array is required"
      });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${promptText}

Analyze these specific tickers now:

${tickers.join(", ")}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 4000
          }
        })
      }
    );

    const rawText = await geminiResponse.text();

    let data;

    try {
      data = JSON.parse(rawText);
    } catch (e) {
      return res.status(500).json({
        error: "Gemini returned invalid JSON",
        response: rawText
      });
    }

    if (!geminiResponse.ok) {
      return res.status(geminiResponse.status).json({
        error: data.error?.message || "Gemini API error"
      });
    }

    return res.status(200).json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message || "Internal Server Error"
    });

  }
}
