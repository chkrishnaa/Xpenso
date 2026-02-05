require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readlineSync = require("readline-sync");

// ✅ force v1
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiVersion: "v1",
});

const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-flash-latest", // ✅ ONLY THIS
});

async function startChat() {
  console.log("🤖 Gemini Chatbot\nType 'exit' to quit.\n");

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "You are a helpful assistant chatbot." }],
      },
    ],
  });

  while (true) {
    const userInput = readlineSync.question("You: ");
    if (userInput.toLowerCase() === "exit") break;

    const result = await chat.sendMessage(userInput);
    console.log("Gemini:", result.response.text(), "\n");
  }
}

startChat();
