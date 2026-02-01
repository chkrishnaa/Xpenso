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
      className={`px-2 py-6 mob:px-6 rounded-none mob:rounded-xl sm:rounded-2xl border-b mob:border transition-colors duration-300 bg-gradient-to-b shadow-none mob:shadow-lg
        ${
          darkMode
            ? "from-gray-950 via-gray-950 to-gray-900 border-gray-600 shadow-gray-500/30"
            : "from-blue-50 via-blue-50 to-blue-100 border-blue-300 shadow-gray-500/30"
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
          <LuPlus className="text-sm" /> Add{" "}
          <span className="hidden mob:inline">Expense</span>
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart data={chartData} type="expense" xKey="month" />
      </div>
    </div>
  );
};

export default ExpenseOverview;
