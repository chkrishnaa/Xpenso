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
import { useTheme } from "../../context/ThemeContext";

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
  const { darkMode } = useTheme();

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

  const axisColor = darkMode ? "#9CA3AF" : "#4B5563";
  const gridColor = darkMode ? "#374151" : "#E5E7EB";

  return (
    <div
      className={`p-6 rounded-2xl border transition-colors duration-300
        ${
          darkMode
            ? "bg-gray-900/80 border-gray-700"
            : "bg-white border-gray-200/50 shadow-md"
        }
      `}
    >
      {/* Header + switch */}
      <div className="flex items-center justify-between mb-4">
        <h5
          className={`text-lg font-medium ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Income vs Expense (Last 30 Days)
        </h5>

        <div
          className={`flex rounded-md overflow-hidden border-2 ${
            darkMode ? "border-green-500" : "border-green-600"
          }`}
        >
          {[
            ["individual", "Individual"],
            ["aggregated-blocks", "Aggregate Blocks"],
            ["aggregate-total", "Aggregate Total"],
          ].map(([key, label], i) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`px-3 py-1 text-sm transition
                ${
                  mode === key
                    ? "bg-green-600 text-white"
                    : darkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {mode === "individual" && (
          <BarChart data={individualData}>
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis dataKey="label" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#111827" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#E5E7EB",
                color: darkMode ? "#E5E7EB" : "#111827",
              }}
            />
            <ReferenceLine y={0} stroke="#3B82F6" />

            <Bar dataKey="base" stackId="a" fill="transparent" />
            <Bar dataKey="value" stackId="a">
              {individualData.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
            </Bar>
          </BarChart>
        )}

        {mode === "aggregated-blocks" && (
          <BarChart data={aggregatedDataBlocks} barGap={0}>
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis dataKey="date" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#111827" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#E5E7EB",
              }}
            />
            <ReferenceLine y={0} stroke="#3B82F6" />

            <Bar dataKey="income" fill="#16A34A" />
            <Bar dataKey="expense" fill="#EF4444" />
            <Bar dataKey="balance">
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
          <BarChart data={aggregatedData} barGap={0}>
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis dataKey="label" stroke={axisColor} />
            <YAxis stroke={axisColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#111827" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#E5E7EB",
              }}
            />
            <ReferenceLine y={0} stroke="#3B82F6" />

            <Bar dataKey="income" fill="#16A34A" />
            <Bar dataKey="expense" fill="#EF4444" />
            <Bar dataKey="balance">
              {aggregatedData.map((e, i) => (
                <Cell
                  key={i}
                  fill={e.balance === null ? "transparent" : e.balanceColor}
                />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default CumulativeIncomeExpenseChart;
