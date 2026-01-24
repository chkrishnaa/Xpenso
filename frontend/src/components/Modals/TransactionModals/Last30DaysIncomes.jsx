import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../../utils/helper';
import CustomBarChart from '../../Charts/CustomBarChart';

const Last30DaysIncomes = ({data}) => {

    const [charData, setCharData]=useState([]);

    useEffect(() => {
        const result=prepareIncomeBarChartData(data);
        setCharData(result);

        return ()=>{};
    }, [data]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 col-span-1">
        <div className="flex items-center justify-between">
            <h5 className="text-lg mb-6">Last 30 Days Incomes</h5>
        </div>

        <CustomBarChart data={charData} type="income" xKey="name" />
    </div>
  );
}

export default Last30DaysIncomes;
