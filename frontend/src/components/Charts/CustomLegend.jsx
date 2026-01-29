import React from "react";
import { useTheme } from "../../context/ThemeContext";
const CustomLegend = ({ payload }) => {
  const { darkMode } = useTheme();

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          {/* Color dot (unchanged) */}
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />

          {/* Label */}
          <span
            className={`text-xs font-medium ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
