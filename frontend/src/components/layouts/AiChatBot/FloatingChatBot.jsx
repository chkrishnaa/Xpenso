import React, { useEffect, useRef, useState } from "react";
import { LuBot, LuX } from "react-icons/lu";
import ChatBot from "./ChatBot";
import { useTheme } from "../../../context/ThemeContext";

const FloatingChatBot = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const { darkMode } = useTheme();

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* CHAT WINDOW */}
      {open && (
        <div
          ref={panelRef}
          className={`fixed bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[420px] h-[70vh] sm:h-[72vh] max-h-[760px] rounded-2xl overflow-hidden flex flex-col ${
            darkMode
              ? "bg-gray-900 border border-gray-700 shadow-2xl"
              : "bg-white border border-gray-200 shadow-xl"
          }`}
        >
          {/* HEADER */}
          <div
            className={`shrink-0 flex items-center justify-between px-4 py-4 border-b bg-linear-to-r from-blue-600/10 to-green-500/10 ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <LuBot className="text-blue-600" size={18} />
              <h4
                className={`font-semibold text-base leading-none ${
                  darkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Xpenso AI
              </h4>
            </div>

            <button
              onClick={() => setOpen(false)}
              className={`h-8 w-8 rounded-full flex items-center justify-center transition ${
                darkMode
                  ? "text-gray-400 hover:text-white hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-800 hover:bg-black/5"
              }`}
              aria-label="Close chatbot"
            >
              <LuX size={18} />
            </button>
          </div>

          {/* CHAT BODY */}
          <ChatBot />
        </div>
      )}

      {/* FLOATING BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-6 right-6 z-50
            h-14 w-14
            rounded-full
            bg-linear-to-br from-green-500 to-blue-500
            text-white
            shadow-lg
            flex items-center justify-center
            hover:scale-105 transition
          "
          aria-label="Open chatbot"
        >
          <LuBot size={22} />
        </button>
      )}
    </>
  );
};

export default FloatingChatBot;
