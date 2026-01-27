import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../../utils/helper';
import CustomBarChart from '../../Charts/CustomBarChart';

const Last30DaysExpenses = ({data}) => {

    const [charData, setCharData]=useState([]);

    useEffect(() => {

      const result = prepareExpenseBarChartData(data);

      setCharData(result);
    }, [data]);


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 col-span-1">
        <div className="flex items-center justify-between">
            <h5 className="text-lg mb-6">Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data={charData} type="expense" xKey="name" />


    </div>
  );
}

export default Last30DaysExpenses
