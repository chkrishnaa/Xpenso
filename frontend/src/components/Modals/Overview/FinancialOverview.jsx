import React, { useMemo } from "react";
import CustomPieChart from "../../Charts/CustomPieChart";

const FinancialOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  // Normalize values
  const income = Math.abs(totalIncome);
  const expense = Math.abs(totalExpense);
  const balance = totalBalance;

  // Console logs (as requested)

  const { data, colors } = useMemo(() => {
    // Case 1: income > expense (positive balance → blue)
    if (balance > 0) {
      return {
        data: [
          { name: "Income", amount: income },
          { name: "Expense", amount: expense },
          { name: "Balance", amount: balance },
        ],
        colors: ["#16A34A", "#EF4444", "#3B82F6"], // green, red, blue
      };
    }

    // Case 2: income < expense (negative balance → violet)
    if (balance < 0) {
      return {
        data: [
          { name: "Income", amount: income },
          { name: "Expense", amount: expense },
          { name: "Loss", amount: Math.abs(balance) },
        ],
        colors: ["#16A34A", "#EF4444", "#8B5CF6"], // green, red, violet
      };
    }

    // Case 3: income === expense (50% green / 50% red)

    return {
      data: [
        { name: "Income", amount: income },
        { name: "Expense", amount: expense },
      ],
      colors: ["#16A34A", "#EF4444"], // green, red
    };
  }, [income, expense, balance]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={data}
        colors={colors}
        label="Total Balance"
        totalAmount={balance}
        showTextAnchor
      />
    </div>
  );
};

export default FinancialOverview;
