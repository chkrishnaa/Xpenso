import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartVisualization } from '../../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../../Charts/CustomBarChart';
import { useTheme } from '../../../context/ThemeContext';

const IncomeOverview = ({transactions, onAddIncomeData}) => {

  const { darkMode } = useTheme();

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

      const result = prepareIncomeBarChartVisualization(transactions);

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
            {" "}
            Income Overview
          </h5>
          <p
            className={`text-xs mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Track your earning over time and analyse your income transactions.
          </p>
        </div>

        <button
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition
            ${
              darkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
          `}
          onClick={onAddIncomeData}
        >
          <LuPlus className="text-sm" /> Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart data={chartData} type="income" xKey="month" />
      </div>
    </div>
  );
}

export default IncomeOverview
