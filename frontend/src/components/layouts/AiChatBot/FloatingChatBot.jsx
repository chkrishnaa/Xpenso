import React, { useEffect, useRef, useState } from "react";
import { LuBot, LuX } from "react-icons/lu";
import ChatBot from "./ChatBot";

const FloatingChatBot = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

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
          className="
            fixed bottom-24 right-6 z-50
            w-[380px] sm:w-[420px]
            max-h-[70vh]
            bg-white dark:bg-gray-900
            border dark:border-gray-700
            rounded-2xl shadow-2xl
            overflow-hidden
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
            <div className="flex items-center gap-2">
              <LuBot className="text-blue-600" />
              <h4 className="font-semibold text-sm dark:text-gray-200">
                Xpenso AI
              </h4>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              <LuX size={18} />
            </button>
          </div>

          {/* CHAT BODY */}
          <ChatBot />
        </div>
      )}

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="
          fixed bottom-6 right-6 z-50
          h-14 w-14
          rounded-full
          bg-gradient-to-br from-green-500 to-blue-500
          text-white
          shadow-lg
          flex items-center justify-center
          hover:scale-105 transition
        "
      >
        <LuBot size={22} />
      </button>
    </>
  );
};

export default FloatingChatBot;
