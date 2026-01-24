import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoIosClose } from "react-icons/io";
import { LuImage } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      {/* PICK ICON ROW (fixed height, no shift) */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl text-gray-800 bg-gray-100 rounded-lg">
          {icon ? (
            <img src={icon} alt="icon" className="w-7 h-7" />
          ) : (
            <LuImage />
          )}
        </div>

        <p className="text-sm font-medium">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* EMOJI PICKER (full width, padded, below row) */}
      {isOpen && (
        <div className="relative mt-4">
          {/* CLOSE BUTTON */}
          <button
            className="w-7 h-7 flex items-center justify-center text-2xl text-gray-800 bg-gray-100 border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <IoIosClose />
          </button>

          {/* PICKER */}
          <div className="w-full">
            <EmojiPicker
              width="100%"
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
