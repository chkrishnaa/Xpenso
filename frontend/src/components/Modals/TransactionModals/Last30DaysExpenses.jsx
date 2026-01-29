import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../../utils/helper";
import CustomBarChart from "../../Charts/CustomBarChart";
import { useTheme } from "../../../context/ThemeContext";

const Last30DaysExpenses = ({ data }) => {
  const [charData, setCharData] = useState([]);
  const { darkMode } = useTheme(); // ✅ REQUIRED

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setCharData(result);
  }, [data]);

  return (
    <div
      className={`p-6 rounded-2xl border col-span-1 transition-colors duration-300
        ${
          darkMode
            ? "bg-gray-900/80 border-gray-700 shadow-lg shadow-black/30"
            : "bg-white border-gray-200/50 shadow-md shadow-gray-100"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <h5
          className={`text-lg mb-6 font-medium ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Last 30 Days Expenses
        </h5>
      </div>

      <CustomBarChart data={charData} type="expense" xKey="name" />
    </div>
  );
};

export default Last30DaysExpenses;
