import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from "recharts";

/* ================= HELPERS ================= */

// INDIVIDUAL – cumulative, transaction by transaction
const buildIndividualCumulativeData = (transactions) => {
  let runningBalance = 0;

  return [...transactions]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((t, index) => {
      const start = runningBalance;
      runningBalance += t.amount;
      const end = runningBalance;

      return {
        label: index + 1,
        base: Math.min(start, end),
        value: Math.abs(end - start),
        color: t.amount >= 0 ? "#16A34A" : "#EF4444",
        balance: runningBalance,
      };
    });
};

// AGGREGATED – 3 grouped blocks per day
const buildAggregatedBlocks = (transactions) => {
  const map = {};

  transactions.forEach((t) => {
    const date = new Date(t.date).toISOString().slice(0, 10);

    if (!map[date]) {
      map[date] = { date, income: 0, expense: 0 };
    }

    if (t.amount >= 0) {
      map[date].income += t.amount;
    } else {
      map[date].expense += Math.abs(t.amount);
    }
  });

  return Object.values(map)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((d) => {
      const balance = d.income - d.expense;

      return {
        date: d.date,
        income: d.income,          // 🟢
        expense: -d.expense,       // 🔴
        balance: balance === 0 ? null : balance,
        balanceColor: balance > 0 ? "#3B82F6" : "#8B5CF6",
      };
    });
};

const buildTotalAggregate = (transactions) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.amount >= 0) {
      income += t.amount;
    } else {
      expense += Math.abs(t.amount);
    }
  });

  const balance = income - expense;

  return [
    {
      label: "Total",
      income,
      expense: -expense, // 🔴 negative for downward bar
      balance: balance === 0 ? null : balance,
      balanceColor: balance > 0 ? "#3B82F6" : "#8B5CF6",
    },
  ];
};


/* ================= COMPONENT ================= */

const CumulativeIncomeExpenseChart = ({ transactions }) => {
  const [mode, setMode] = useState("individual");

  const individualData = useMemo(
    () => buildIndividualCumulativeData(transactions || []),
    [transactions]
  );

  const aggregatedDataBlocks = useMemo(
    () => buildAggregatedBlocks(transactions || []),
    [transactions]
  );

  const aggregatedData = useMemo(
    () => buildTotalAggregate(transactions || []),
    [transactions]
  );


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200/50">
      {/* Header + switch */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg">Income vs Expense (Last 30 Days)</h5>

        <div className="flex rounded-md overflow-hidden border-2 border-green-600">
          <button
            onClick={() => setMode("individual")}
            className={`px-3 py-1 text-sm ${
              mode === "individual" ? "bg-green-600 text-white" : "bg-gray-100"
            }`}
          >
            Individual
          </button>
          <div className="w-px bg-green-600" />
          <button
            onClick={() => setMode("aggregated-blocks")}
            className={`px-3 py-1 text-sm ${
              mode === "aggregated-blocks"
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Aggregate Blocks
          </button>
          <div className="w-px bg-green-600" />
          <button
            onClick={() => setMode("aggregate-total")}
            className={`px-3 py-1 text-sm ${
              mode === "aggregate-total"
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Aggregate Total
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {mode === "individual" && (
          /* ===== INDIVIDUAL CHART ===== */
          <BarChart data={individualData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip
              formatter={(_, __, props) => [
                `Balance: ${props.payload.balance}`,
                "",
              ]}
            />
            <ReferenceLine y={0} stroke="rgba(0,0,255,0.7)" />

            <Bar
              dataKey="base"
              stackId="a"
              fill="transparent"
              radius={[3, 3, 3, 3]}
            />
            <Bar dataKey="value" stackId="a" radius={[3, 3, 3, 3]}>
              {individualData.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
            </Bar>
          </BarChart>
        )}
        {mode === "aggregated-blocks" && (
          /* ===== AGGREGATED CHART ===== */
          <BarChart data={aggregatedDataBlocks}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke="rgba(0,0,255,0.7)" />

            <Bar dataKey="income" fill="#16A34A" radius={[5, 5, 0, 0]} />
            <Bar dataKey="expense" fill="#EF4444" radius={[5, 5, 0, 0]} />
            <Bar dataKey="balance" radius={[5, 5, 0, 0]}>
              {aggregatedDataBlocks.map((e, i) => (
                <Cell
                  key={i}
                  fill={e.balance === null ? "transparent" : e.balanceColor}
                />
              ))}
            </Bar>
          </BarChart>
        )}
        {mode === "aggregate-total" && (
          /* ===== AGGREGATED CHART ===== */
          <BarChart data={aggregatedData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke="rgba(0,0,255,0.7)" />

            <Bar dataKey="income" fill="#16A34A" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#EF4444" radius={[6, 6, 0, 0]} />
            <Bar dataKey="balance" radius={[6, 6, 0, 0]}>
              {aggregatedData.map((e, i) => (
                <Cell
                  key={i}
                  fill={e.balance === null ? "transparent" : e.balanceColor}
                />
              ))}
            </Bar>
          </BarChart>
        )}
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <ReferenceLine y={0} stroke="rgba(0,0,255,0.7)" />
      </ResponsiveContainer>
    </div>
  );
};

export default CumulativeIncomeExpenseChart;
