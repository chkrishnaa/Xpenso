const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini once (good practice)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * POST /api/v1/ai/chat
 */
exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash-latest",
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return res.status(500).json({ error: "Gemini API failed" });
  }
};
