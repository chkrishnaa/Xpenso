import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartVisualization } from '../../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../../Charts/CustomBarChart';

const IncomeOverview = ({transactions, onAddIncomeData}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

      const result = prepareIncomeBarChartVisualization(transactions);

      setChartData(result);
    }, [transactions]);


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="text-lg">Income Overview</h5>
                <p className="text-xs text-gray-500 mt-1">Track your earning over time and analyse your income transactions.</p>
            </div>

            <button className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md" onClick={onAddIncomeData}>
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
