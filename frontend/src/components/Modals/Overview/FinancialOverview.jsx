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
