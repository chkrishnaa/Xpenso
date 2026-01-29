import React from "react";
import { IoIosClose } from "react-icons/io";
import { useTheme } from "../../../context/ThemeContext";

const Transaction = ({ children, isOpen, onClose, title }) => {
  const { darkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden
        ${darkMode ? "bg-black/60" : "bg-black/30"}
      `}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div
          className={`relative rounded-lg shadow-lg transition-colors
            ${
              darkMode
                ? "bg-gray-900 border border-gray-700"
                : "bg-white border border-gray-200"
            }
          `}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-4 md:p-5 border-b rounded-t
              ${darkMode ? "border-gray-700" : "border-gray-200"}
            `}
          >
            <h3
              className={`text-lg font-medium ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {title}
            </h3>

            <button
              type="button"
              onClick={onClose}
              className={`rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center cursor-pointer transition
                ${
                  darkMode
                    ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                    : "text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                }
              `}
            >
              <IoIosClose size={28} />
            </button>
          </div>

          {/* Body */}
          <div
            className={`p-4 md:p-5 space-y-4 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
