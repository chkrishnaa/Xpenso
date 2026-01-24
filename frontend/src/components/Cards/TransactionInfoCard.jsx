import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({ ...props }) => {
  const getAmountStyles = () => {
    return props.type === "income"
      ? "bg-green-200 text-green"
      : "bg-red-200 text-red";
  };

  const value = Math.abs(Number(props.amount) || 0);

  return (
    <div
      className={`border border-blue-200 group relative flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-gray-100/30`}
    >
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {props.icon ? (
          <img src={props.icon} alt={props.title} className="w-6 h-6" />
        ) : (
          <LuUtensils className="w-6 h-6" />
        )}
      </div>

      <div className="flex-1 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700 font-medium">{props.title}</p>
          <p className="text-xs text-gray-400 mt-1">{props.date}</p>
        </div>

        <div className="flex items-center gap-2">
          {!props.hideDeleteBtn && (
            <button
              onClick={props.onDelete}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <LuTrash2 size={18} />
            </button>
          )}

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
