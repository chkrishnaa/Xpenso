import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

const parseInlineMarkdown = (text, keyPrefix) => {
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = String(text || "").split(regex).filter(Boolean);

  return parts.map((part, idx) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={`${keyPrefix}-b-${idx}`}>{part.slice(2, -2)}</strong>;
    }
    if (/^\*[^*]+\*$/.test(part)) {
      return <em key={`${keyPrefix}-i-${idx}`}>{part.slice(1, -1)}</em>;
    }
    if (/^`[^`]+`$/.test(part)) {
      return (
        <code
          key={`${keyPrefix}-c-${idx}`}
          className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={`${keyPrefix}-t-${idx}`}>{part}</React.Fragment>;
  });
};

const renderMarkdown = (text) => {
  const lines = String(text || "").split("\n");
  const blocks = [];
  let currentListItems = [];
  let listType = null;

  const flushList = (keyBase) => {
    if (!currentListItems.length || !listType) return;
    const ListTag = listType === "ol" ? "ol" : "ul";
    blocks.push(
      <ListTag
        key={`${keyBase}-list`}
        className={`pl-5 my-2 space-y-1 ${listType === "ol" ? "list-decimal" : "list-disc"}`}
      >
        {currentListItems.map((item, idx) => (
          <li key={`${keyBase}-li-${idx}`}>{parseInlineMarkdown(item, `${keyBase}-li-${idx}`)}</li>
        ))}
      </ListTag>
    );
    currentListItems = [];
    listType = null;
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trimEnd();
    const keyBase = `line-${idx}`;

    if (!line.trim()) {
      flushList(keyBase);
      blocks.push(<div key={`${keyBase}-sp`} className="h-2" />);
      return;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    const unorderedMatch = line.match(/^[-*]\s+(.*)$/);

    if (headingMatch) {
      flushList(keyBase);
      const level = headingMatch[1].length;
      const content = headingMatch[2];
      const headingClass =
        level <= 2
          ? "text-base font-bold mt-2 mb-1"
          : "text-sm font-semibold mt-2 mb-1";
      blocks.push(
        <p key={`${keyBase}-h`} className={headingClass}>
          {parseInlineMarkdown(content, `${keyBase}-h`)}
        </p>
      );
      return;
    }

    if (orderedMatch) {
      if (listType && listType !== "ol") flushList(keyBase);
      listType = "ol";
      currentListItems.push(orderedMatch[1]);
      return;
    }

    if (unorderedMatch) {
      if (listType && listType !== "ul") flushList(keyBase);
      listType = "ul";
      currentListItems.push(unorderedMatch[1]);
      return;
    }

    flushList(keyBase);
    blocks.push(
      <p key={`${keyBase}-p`} className="my-1">
        {parseInlineMarkdown(line, `${keyBase}-p`)}
      </p>
    );
  });

  flushList("end");
  return blocks;
};

const ChatBot = () => {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState(() => {
    const storedUser = localStorage.getItem("user");
    let userKey = "guest";
    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      userKey = parsedUser?._id || parsedUser?.id || "guest";
    } catch {
      userKey = "guest";
    }
    const saved = localStorage.getItem(`xpenso_ai_messages_${userKey}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let userKey = "guest";
    try {
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      userKey = parsedUser?._id || parsedUser?.id || "guest";
    } catch {
      userKey = "guest";
    }
    localStorage.setItem(`xpenso_ai_messages_${userKey}`, JSON.stringify(messages));
  }, [messages]);

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

  return (
    <div
      className={`flex flex-1 min-h-0 flex-col ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-3 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[85%] text-sm leading-6 ${
              m.role === "user"
                ? "bg-blue-600/95 text-white ml-auto"
                : darkMode
                ? "bg-gray-800 text-gray-200"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {renderMarkdown(m.text)}
          </div>
        ))}

        {loading && (
          <p
            className={`text-xs italic ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            AI is thinking...
          </p>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div
        className={`shrink-0 p-4 pt-3 border-t ${
          darkMode
            ? "border-gray-700 bg-gray-900/90"
            : "border-gray-200 bg-gray-50/90"
        }`}
      >
        <div
          className={`flex items-center gap-2 rounded-xl border px-2 py-2 shadow-sm ${
            darkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-300 bg-white"
          }`}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`flex-1 bg-transparent outline-none px-2 py-1 text-sm placeholder:text-gray-500 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
            placeholder="Ask about your income, expenses, balance..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-500 hover:to-blue-400 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
