import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../../utils/helper';
import CustomBarChart from '../../Charts/CustomBarChart';
import { useTheme } from '../../../context/ThemeContext';

const Last30DaysIncomes = ({data}) => {
  const {darkMode}=useTheme();

    const [charData, setCharData]=useState([]);

    useEffect(() => {
        const result=prepareIncomeBarChartData(data);
        setCharData(result);

        return ()=>{};
    }, [data]);

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
          className={`text-lg mb-6 font-medium ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Last 30 Days Incomes
        </h5>
      </div>

      <CustomBarChart data={charData} type="income" xKey="name" />
    </div>
  );
}

export default Last30DaysIncomes;
