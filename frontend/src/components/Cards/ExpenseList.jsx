import React from "react";
import { LuDownload, LuTrash2 } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { useTheme } from "../../context/ThemeContext";

const ExpenseList = ({ ...props }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`p-6 rounded-2xl border transition-colors duration-300
        ${
          darkMode
            ? "bg-gray-900/80 border-gray-700 shadow-lg shadow-black/30"
            : "bg-white border-gray-200/50 shadow-md shadow-gray-100"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <h5
          className={`text-lg font-medium ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Expense Categories
        </h5>

        <div className="flex space-x-2">
          {/* DOWNLOAD */}
          <button
            onClick={props.onDownload}
            className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition
              ${
                darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            <LuDownload className="text-sm" />
          </button>

          {/* DELETE ALL (keep red) */}
          <button
            onClick={props.onDeleteAll}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-md
              bg-red-500 hover:bg-red-600 text-white transition"
          >
            <LuTrash2 className="text-sm" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {[...props.transactions]
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              amount={expense.amount}
              date={moment(expense.date).format("Do MM YYYY")}
              type="expense"
              onDelete={() => props.onDelete(expense._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default ExpenseList;
