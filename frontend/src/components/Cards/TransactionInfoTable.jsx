import React from "react";
import {
  LuImage,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";
import { useTheme } from "../../context/ThemeContext";

const TransactionInfoTable = ({ ...props }) => {
  const { darkMode } = useTheme();

  const getAmountStyles = () => {
    if (props.type === "income") {
      return darkMode ? "text-green-300" : "text-income";
    }

    return darkMode ? "text-red-300" : "text-expense";
  };

  const value = Math.abs(Number(props.amount) || 0);

  return (
    <div
      className={`flex items-center gap-2 px-2 py-1 border-b
        ${darkMode ? "border-gray-700" : "border-gray-200"}
      `}
    >
      {/* Icon */}
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm
          ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
          }
        `}
      >
        {props.icon ? (
          <img src={props.icon} alt={props.title} className="w-4 h-4" />
        ) : (
          <LuImage className="w-4 h-4" />
        )}
      </div>

      {/* Title + Date */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-xs font-medium truncate ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          {props.title}
        </p>
        <p className="text-[10px] text-gray-400 truncate">{props.date}</p>
      </div>

      {/* Amount + action */}
      <div className="flex items-center gap-1">
        <span className={`text-xs font-semibold ${getAmountStyles()}`}>
          {props.type === "income" ? `+${value}` : `-${value}`}
        </span>

        {props.type === "income" ? (
          <LuTrendingUp className="w-4 h-4 text-green-500" />
        ) : (
          <LuTrendingDown className="w-4 h-4 text-red-500" />
        )}

        {!props.hideDeleteBtn && (
          <button
            onClick={props.onDelete}
            className={`ml-1 ${
              darkMode
                ? "text-gray-500 hover:text-red-400"
                : "text-gray-400 hover:text-red-500"
            }`}
          >
            <LuTrash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionInfoTable;
