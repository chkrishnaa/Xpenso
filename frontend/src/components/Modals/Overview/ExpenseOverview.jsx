import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartVisualization } from '../../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../../Charts/CustomLineChart';

const ExpenseOverview = ({transactions, onAddExpenseData}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {

      const result = prepareExpenseLineChartVisualization(transactions);
      setChartData(result);
    }, [transactions]);


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="text-lg">Expense Overview</h5>
                <p className="text-xs text-gray-500 mt-1">Track your spending over time and analyse your expense transactions.</p>
            </div>

            <button className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md" onClick={onAddExpenseData}>
                <LuPlus className="text-sm" /> Add Expense
            </button>
        </div>

        <div className="mt-10">
            <CustomLineChart data={chartData} type="expense" xKey="month" />
        </div>
    </div>
  );
}

export default ExpenseOverview
