import React from 'react'
import CustomPieChart from '../../Charts/CustomPieChart'

const FinancialOverview = ({totalBalance, totalIncome, totalExpense}) => {

  const balanceData = [
    {name: "Total Balance", amount: totalBalance},
    {name: "Total Income", amount: totalIncome},
    {name: "Total Expense", amount: totalExpense},
  ]
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={totalBalance}
        colors={["#3B82F6", "#16A34A", "#EF4444"]}
        showTextAnchor
      />
    </div>
  );
}

export default FinancialOverview
