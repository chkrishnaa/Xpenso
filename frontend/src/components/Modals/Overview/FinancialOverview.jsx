import React, { useMemo } from "react";
import CustomPieChart from "../../Charts/CustomPieChart";
import { useTheme } from "../../../context/ThemeContext";

const FinancialOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const { darkMode } = useTheme();

  // Normalize values
  const income = Math.abs(totalIncome);
  const expense = Math.abs(totalExpense);
  const balance = totalBalance;

  const { data, colors } = useMemo(() => {
    if (balance > 0) {
      return {
        data: [
          { name: "Income", amount: income },
          { name: "Expense", amount: expense },
          { name: "Balance", amount: balance },
        ],
        colors: ["#16A34A", "#EF4444", "#3B82F6"],
      };
    }

    if (balance < 0) {
      return {
        data: [
          { name: "Income", amount: income },
          { name: "Expense", amount: expense },
          { name: "Loss", amount: Math.abs(balance) },
        ],
        colors: ["#16A34A", "#EF4444", "#8B5CF6"],
      };
    }

    return {
      data: [
        { name: "Income", amount: income },
        { name: "Expense", amount: expense },
      ],
      colors: ["#16A34A", "#EF4444"],
    };
  }, [income, expense, balance]);

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
          Financial Overview
        </h5>
      </div>

      <CustomPieChart
        data={data}
        colors={colors}
        label="Total Balance"
        totalAmount={balance}
        showTextAnchor
      />
    </div>
  );
};

export default FinancialOverview;
