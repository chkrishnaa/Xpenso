import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../../Cards/TransactionInfoCard";
import moment from "moment";
import { useTheme } from "../../../context/ThemeContext";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`px-2 py-6 mob:px-6 rounded-none mob:rounded-xl sm:rounded-2xl border-t mob:border transition-colors duration-300 bg-gradient-to-b shadow-none mob:shadow-lg
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
          Expenses
        </h5>

        <button
          onClick={onSeeMore}
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition
            ${
              darkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
          `}
        >
          See All <LuArrowRight className="text-sm" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 mob:gap-4 mt-6">
        {transactions
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              amount={expense.amount}
              date={moment(expense.date).format("Do MM YYYY")}
              type="expense"
              hideDeleteBtn
            />
          ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
