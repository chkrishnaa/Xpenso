import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../../Cards/TransactionInfoCard";
import moment from "moment";
import { useTheme } from "../../../context/ThemeContext";

const RecentTransactions = ({ transactions, onSeeMore }) => {
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5
          className={`text-lg font-medium ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Recent Transactions
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

      {/* Transactions */}
      <div className="grid grid-cols-1 gap-4 mt-6">
        {transactions
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5)
          .map((transaction) => (
            <TransactionInfoCard
              key={transaction._id}
              title={
                transaction.type === "income"
                  ? transaction.source
                  : transaction.category
              }
              icon={transaction.icon}
              amount={transaction.amount}
              date={moment(transaction.date).format("Do MMM YYYY")}
              type={transaction.type}
              hideDeleteBtn
            />
          ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
