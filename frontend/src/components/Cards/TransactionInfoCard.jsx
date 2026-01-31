import React from "react";
import {
  LuImage,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";
import { useTheme } from "../../context/ThemeContext";

const TransactionInfoCard = ({ ...props }) => {
  const { darkMode } = useTheme();

  const getAmountStyles = () => {
    if (props.type === "income") {
      return darkMode
        ? "bg-gradient-to-br from-green-700/40 to-green-600/40 text-green-300"
        : "bg-gradient-to-br from-green-200 to-green-300 text-income";
    }

    return darkMode
      ? "bg-gradient-to-br from-red-700/40 to-red-600/40 text-red-300"
      : "bg-gradient-to-br from-red-200 to-red-300 text-expense";
  };

  const value = Math.abs(Number(props.amount) || 0);

  return (
    <div
      className={`group relative flex items-center gap-2 mob:gap-4 px-2 mob:px-3 py-2 rounded-md mob:rounded-lg border transition-colors
        ${
          darkMode
            ? "border-gray-700 hover:bg-white/5"
            : "border-blue-200 hover:bg-blue-100/90"
        }
      `}
    >
      {/* Icon */}
      <div
        className={`w-10 mob:w-12 h-10 mob:h-12 flex items-center justify-center text-xl rounded-full
          ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-800"
          }
        `}
      >
        {props.icon ? (
          <img src={props.icon} alt={props.title} className="w-6 h-6" />
        ) : (
          <LuImage className="w-6 h-6" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-between items-center">
        <div>
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {props.title}
          </p>
          <p
            className={`text-xs mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-400"
            }`}
          >
            {props.date}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!props.hideDeleteBtn && (
            <button
              onClick={props.onDelete}
              className={`opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer
                ${
                  darkMode
                    ? "text-gray-500 hover:text-red-400"
                    : "text-gray-400 hover:text-red-500"
                }
              `}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          {/* Amount */}
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {props.type === "income" ? `+${value}` : `-${value}`}
            </h6>

            {props.type === "income" ? (
              <LuTrendingUp className="w-5 h-5" />
            ) : (
              <LuTrendingDown className="w-5 h-5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
