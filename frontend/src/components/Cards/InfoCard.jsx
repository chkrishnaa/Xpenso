import React from "react";
import { useTheme } from "../../context/ThemeContext";

const InfoCard = ({ icon, label, value, color }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`flex gap-6 p-6 rounded-xl mob:rounded-2xl border transition-all duration-300
        ${
          darkMode
            ? "from-gray-950 via-gray-900 to-gray-950 border-gray-700/50 shadow-lg shadow-gray-500/30"
            : "from-blue-50 via-blue-100 to-blue-50 border-gray-200/50 shadow-md shadow-gray-500/30"
        }
      `}
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <h6
          className={`text-sm mb-1 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {label}
        </h6>

        <span
          className={`text-[22px] font-semibold ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
