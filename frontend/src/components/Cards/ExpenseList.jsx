import React from "react";
import { LuDownload, LuTrash2 } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { useTheme } from "../../context/ThemeContext";
import TransactionInfoTable from "./TransactionInfoTable";

const ExpenseList = ({ ...props }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`px-2 py-6 mob:px-6 rounded-none mob:rounded-xl sm:rounded-2xl border-b mob:border transition-colors duration-300 bg-gradient-to-b shadow-none mob:shadow-lg
        ${
          darkMode
            ? "from-gray-950 via-gray-950 to-gray-900 border-gray-600 shadow-gray-500/30"
            : "from-blue-50 via-blue-50 to-blue-100 border-blue-300 shadow-gray-500/30"
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

      <div className="hidden mob:grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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

      <div className="grid grid-cols-1 gap-1 mt-8 mob:hidden">
        {[...props.transactions]
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((expense) => (
            <TransactionInfoTable
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
