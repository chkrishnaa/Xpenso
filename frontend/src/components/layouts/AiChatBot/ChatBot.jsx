import React, { useEffect, useRef, useState } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // or wherever you store it

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/ai/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: userText }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "❌ Unable to reach AI. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  console.log(import.meta.env.VITE_BACKEND_URL);

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-xl bg-white dark:bg-gray-900">
      {/* CHAT AREA */}
      <div className="h-96 overflow-y-auto mb-3 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] text-sm ${
              m.role === "user"
                ? "bg-blue-600 text-white ml-auto text-right"
                : "bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <p className="text-xs text-gray-400 italic">AI is thinking…</p>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
          placeholder="Ask about your income, expenses, balance…"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
