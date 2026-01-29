import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartVisualization } from "../../../utils/helper";
import { LuPlus } from "react-icons/lu";
import CustomLineChart from "../../Charts/CustomLineChart";
import { useTheme } from "../../../context/ThemeContext";

const ExpenseOverview = ({ transactions, onAddExpenseData }) => {
  const [chartData, setChartData] = useState([]);
  const { darkMode } = useTheme();

  useEffect(() => {
    const result = prepareExpenseLineChartVisualization(transactions);
    setChartData(result);
  }, [transactions]);

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
        <div>
          <h5
            className={`text-lg font-medium ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Expense Overview
          </h5>

          <p
            className={`text-xs mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Track your spending over time and analyse your expense transactions.
          </p>
        </div>

        <button
          onClick={onAddExpenseData}
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition
            ${
              darkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
          `}
        >
          <LuPlus className="text-sm" /> Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} type="expense" xKey="month" />
      </div>
    </div>
  );
};

export default ExpenseOverview;
