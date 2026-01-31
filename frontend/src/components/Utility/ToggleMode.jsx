import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const ToggleMode = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300
        ${
          darkMode
            ? "bg-gradient-to-r from-green-300 to-green-600"
            : "bg-gradient-to-r from-blue-600 to-blue-300"
        }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
          ${
            darkMode ? "translate-x-4" : "translate-x-0"
          } flex items-center justify-center`}
      >
        {darkMode ? (
          <FaSun className="text-green-500 w-3 h-3" />
        ) : (
          <FaMoon className="text-blue-500 w-3 h-3" />
        )}
      </div>
    </button>
  );
};

export default ToggleMode;
