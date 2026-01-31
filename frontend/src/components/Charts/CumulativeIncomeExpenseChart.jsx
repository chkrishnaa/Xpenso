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
import { formatNumber } from "../../utils/helper";
import {useWindowWidth} from "../../hooks/useWindowWidth";

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

const CustomYAxisTick = ({ x, y, payload }) => {
  let color = "#3B82F6"; // balance (0)

  if (payload.value > 0) color = "#16A34A"; // income
  if (payload.value < 0) color = "#EF4444"; // expense

  return (
    <text
      x={x - 4} // 👈 pulls text closer, uses free space
      y={y}
      textAnchor="end"
      dominantBaseline="middle"
      fill={color}
      fontSize={10} // 👈 SMALL text (mobile safe)
      fontWeight={500}
    >
      {formatNumber(Math.abs(payload.value))}
    </text>
  );
};

/* ================= COMPONENT ================= */

const CumulativeIncomeExpenseChart = ({ transactions }) => {
  const windowWidth = useWindowWidth();
  const chartHeight = windowWidth > 400 ? 400 : 300;
  const isMobile = windowWidth <= 400;
  const axisFontSize = isMobile ? 10 : 12;


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

  const IndividualBarCount = individualData.length;
  const AggregatedDataBlockCount = aggregatedDataBlocks.length;

  const IndividualBarRadius = IndividualBarCount > 10 ? 0 : [6, 6, 6, 6];
  const AggregatedDataBlockRadius = AggregatedDataBlockCount > 10 ? 0 : [6, 6, 0, 0];

    

  const axisColor = darkMode ? "#9CA3AF" : "#4B5563";
  const gridColor = darkMode ? "#374151" : "#E5E7EB";

  return (
    <div
      className={`p-4 mob:p-6 rounded-2xl border transition-colors duration-300bg-gradient-to-br
        ${
          darkMode
            ? "from-gray-950 via-gray-900 to-gray-950 border-gray-700/50 shadow-lg shadow-gray-500/30"
            : "from-blue-50 via-blue-100 to-blue-50 border-gray-200/50 shadow-md shadow-gray-500/30"
        }
      `}
    >
      {/* Header + switch */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <h5
          className={`text-lg font-medium ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Income vs Expense (Last 30 Days)
        </h5>

        <div className="flex w-full sm:w-auto justify-end">
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
                className={`px-3 py-1 text-xs mob:text-sm transition
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
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        {mode === "individual" && (
          <BarChart data={individualData}>
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis dataKey="label" stroke={axisColor} tick={{ fontSize: axisFontSize}} />
            <YAxis
              tick={<CustomYAxisTick />}
              axisLine={{ stroke: axisColor }}
              tickLine={false}
              // tick={{ fontSize: axisFontSize }}
              width={48} // 👈 IMPORTANT: prevents extra empty space
            />

            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#111827" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#E5E7EB",
                color: darkMode ? "#E5E7EB" : "#111827",
              }}
            />
            <ReferenceLine y={0} stroke="#3B82F6" />

            <Bar dataKey="base" stackId="a" fill="transparent" />
            <Bar dataKey="value" stackId="a" radius={IndividualBarRadius}>
              {individualData.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
            </Bar>
          </BarChart>
        )}

        {mode === "aggregated-blocks" && (
          <BarChart data={aggregatedDataBlocks} barGap={0}>
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis dataKey="date" stroke={axisColor} tick={{ fontSize: 10 }} />
            <YAxis
              tick={<CustomYAxisTick />}
              axisLine={{ stroke: axisColor }}
              tickLine={false}
              width={48} // 👈 IMPORTANT: prevents extra empty space
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#111827" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#E5E7EB",
              }}
            />
            <ReferenceLine y={0} stroke="#3B82F6" />

            <Bar
              dataKey="income"
              fill="#16A34A"
              radius={AggregatedDataBlockRadius}
            />
            <Bar
              dataKey="expense"
              fill="#EF4444"
              radius={AggregatedDataBlockRadius}
            />
            <Bar dataKey="balance" radius={AggregatedDataBlockRadius}>
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
            <CartesianGrid
              vertical={false}
              stroke={gridColor}
              tick={{ fontSize: 10 }}
            />
            <XAxis dataKey="label" stroke={axisColor} tick={{ fontSize: 10 }} />
            <YAxis
              tick={<CustomYAxisTick />}
              axisLine={{ stroke: axisColor }}
              tickLine={false}
              width={48} // 👈 IMPORTANT: prevents extra empty space
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#111827" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#E5E7EB",
              }}
            />
            <ReferenceLine y={0} stroke="#3B82F6" />

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
      </ResponsiveContainer>
    </div>
  );
};

export default CumulativeIncomeExpenseChart;
