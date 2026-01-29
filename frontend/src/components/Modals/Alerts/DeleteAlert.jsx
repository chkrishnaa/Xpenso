import React from "react";
import { useTheme } from "../../../context/ThemeContext";

const DeleteAlert = ({ content, onDelete }) => {
  const { darkMode } = useTheme();

  return (
    <div>
      <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {content}
      </p>

      <div className="flex justify-end mt-6">
        <button
          onClick={onDelete}
          className="text-sm px-3 py-2 rounded-md transition
            bg-red-500 hover:bg-red-600 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
