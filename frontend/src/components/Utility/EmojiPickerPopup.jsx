import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoIosClose } from "react-icons/io";
import { LuImage } from "react-icons/lu";
import { useTheme } from "../../context/ThemeContext";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useTheme();

  return (
    <div className="mb-6">
      {/* PICK ICON ROW */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`w-12 h-12 flex items-center justify-center text-2xl rounded-lg transition
            ${
              darkMode
                ? "bg-gray-800 text-gray-200"
                : "bg-gray-100 text-gray-800"
            }
          `}
        >
          {icon ? (
            <img src={icon} alt="icon" className="w-7 h-7" />
          ) : (
            <LuImage />
          )}
        </div>

        <p
          className={`text-sm font-medium ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* EMOJI PICKER */}
      {isOpen && (
        <div className="relative mt-4">
          {/* CLOSE BUTTON */}
          <button
            className={`w-7 h-7 flex items-center justify-center text-2xl rounded-full absolute -top-2 -right-2 z-10 transition
              ${
                darkMode
                  ? "bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
              }
            `}
            onClick={() => setIsOpen(false)}
          >
            <IoIosClose />
          </button>

          {/* PICKER */}
          <div className="w-full">
            <EmojiPicker
              width="100%"
              theme={darkMode ? "dark" : "light"}
              onEmojiClick={(emoji) =>
                onSelect(emoji?.imageUrl || emoji?.emoji || "")
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
