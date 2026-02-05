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
  Label,
} from "recharts";
import moment from "moment";
import { useTheme } from "../../context/ThemeContext";
import { formatNumber } from "../../utils/helper";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";


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

        // chart math
        base: Math.min(start, end),
        value: Math.abs(end - start),
        balance: runningBalance,

        // tooltip data
        amount: t.amount,
        type: t.type,
        labelName: t.labelName, // ✅ THIS FIXES IT
        createdAt: t.createdAt,
        color: t.type === "income" ? "#16A34A" : "#EF4444",
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
        date: moment(d.date).format("Do MMM"),
        income: d.income, // 🟢
        expense: -d.expense, // 🔴
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

const CustomYAxisTick =
  (fontSize) =>
  ({ x, y, payload }) => {
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
        fontSize={fontSize} // 👈 SMALL text (mobile safe)
        fontWeight={500}
      >
        {formatNumber(Math.abs(payload.value))}
      </text>
    );
  };

const TooltipIndividual = ({ active, payload, darkMode }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  const isIncome = data.type === "income" || data.amount > 0;

  const primaryColor = isIncome ? "#16A34A" : "#EF4444";

  const borderColor = isIncome ? "border-income" : "border-expense";

  return (
    <div
      className={`
        min-w-[200px] mob:min-w-[250px] rounded-md sm:rounded-lg mob:rounded-xl border ${borderColor}
        bg-gradient-to-b shadow-none mob:shadow-lg
        p-3 mob:p-4
        transition-all duration-200
        ${
          darkMode
            ? "from-gray-950 via-gray-950 to-gray-900 border-gray-600 shadow-gray-500/30 text-gray-200"
            : "from-blue-50 via-blue-50 to-blue-100 border-blue-300 shadow-gray-500/30 text-gray-800"
        }
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <h6
          className="text-[10px] mob:text-xs font-semibold uppercase tracking-wide"
          style={{ color: primaryColor }}
        >
          {isIncome ? "Income" : "Expense"}
        </h6>

        <div
          className={`
    rounded-full px-2 py-1 flex items-center justify-center
    ${
      isIncome
        ? darkMode
          ? "bg-green-400/30"
          : "bg-green-400"
        : darkMode
        ? "bg-red-400/30"
        : "bg-red-400"
    }
  `}
        >
          {isIncome ? (
            <LuTrendingUp
              size={12}
              className={darkMode ? "text-green-400" : "text-white"}
            />
          ) : (
            <LuTrendingDown
              size={12}
              className={darkMode ? "text-red-400" : "text-white"}
            />
          )}
        </div>
      </div>

      {/* SOURCE / CATEGORY */}
      <p
        className="text-xs mob:text-sm font-medium mb-2 leading-snug"
        // style={{ color: primaryColor }}
      >
        {isIncome ? "Income Source" : "Expense Category"}:&nbsp;
        <span className="font-semibold" style={{ color: primaryColor }}>
          {data.labelName}
        </span>
      </p>

      {/* AMOUNT */}
      <p className="text-xs mob:text-sm mb-3">
        Amount:&nbsp;
        <span className="font-semibold" style={{ color: primaryColor }}>
          {isIncome ? "+" : "-"}₹{Math.abs(data.amount)}
        </span>
      </p>

      {/* DIVIDER */}
      <div
        className={`my-2 h-px w-full ${
          darkMode ? "bg-gray-700" : "bg-gray-300"
        }`}
      />

      {/* DATE & TIME */}
      {data.createdAt && (
        <div className="flex flex-col items-end text-[10px] mob:text-xs text-gray-400">
          <span>
            {`${moment(data.createdAt).format("Do MMM YYYY")} : ${moment(
              data.createdAt
            ).format("hh:mm A")}`}
          </span>
        </div>
      )}
    </div>
  );
};

const TooltipAggregate = ({ active, payload, darkMode, showDate = true }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  const balancePositive = (data.balance ?? 0) >= 0;

  return (
    <div
      className={`
        min-w-[180px] mob:min-w-[250px] rounded-md sm:rounded-lg mob:rounded-xl border
        bg-gradient-to-b shadow-none mob:shadow-lg
        p-3 mob:p-4
        transition-all duration-200
        ${
          darkMode
            ? "from-gray-950 via-gray-950 to-gray-900 border-gray-600 shadow-gray-500/30 text-gray-200"
            : "from-blue-50 via-blue-50 to-blue-100 border-blue-300 shadow-gray-500/30 text-gray-800"
        }
      `}
    >
      {/* DATE */}
      {showDate && data.date && (
        <p
          className={`text-xs mob:text-sm font-semibold mb-2 ${
            balancePositive ? "text-blue-400" : "text-violet-400"
          }`}
        >
          {data.date}
        </p>
      )}

      {/* INCOME */}
      <div className="flex items-center justify-between">
        <span className="text-xs mob:text-sm font-semibold text-green-500">
          Income
        </span>

        <div
          className="flex items-center gap-2 font-semibold text-xs mob:text-sm text-income mb-2"
          // className={`
          //   rounded-full p-1
          //   ${darkMode ? "bg-red-600/20" : "bg-red-100"}
          // `}
        >
          <div>
            <LuTrendingUp
              size={12}
              className={darkMode ? "text-green-400" : "text-green-600"}
            />
          </div>
          ₹{data.income}
        </div>
      </div>

      {/* EXPENSE */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs mob:text-sm font-semibold text-red-500">
          Expense
        </span>

        <div
          className="flex items-center gap-2 font-semibold text-xs mob:text-sm text-expense"
          // className={`
          //   rounded-full p-1
          //   ${darkMode ? "bg-red-600/20" : "bg-red-100"}
          // `}
        >
          <div>
            <LuTrendingDown
              size={12}
              className={darkMode ? "text-red-400" : "text-red-600"}
            />
          </div>
          ₹{Math.abs(data.expense)}
        </div>
      </div>

      {/* DIVIDER */}
      <div
        className={`my-2 h-px w-full ${
          darkMode ? "bg-gray-700" : "bg-gray-300"
        }`}
      />

      {/* BALANCE */}
      {data.balance !== null && (
        <div className="flex items-center justify-between">
          <span
            className="text-xs mob:text-sm font-semibold"
            style={{ color: balancePositive ? "#3B82F6" : "#8B5CF6" }}
          >
            Balance
          </span>

          <div
            className="flex items-center gap-2 font-semibold text-xs mob:text-sm"
            style={{ color: balancePositive ? "#3B82F6" : "#8B5CF6" }}
          >
            <div
            // className={`
            //   rounded-full p-1
            //   ${
            //     balancePositive
            //       ? darkMode
            //         ? "bg-blue-600/20"
            //         : "bg-blue-100"
            //       : darkMode
            //       ? "bg-violet-600/20"
            //       : "bg-violet-100"
            //   }
            // `}
            >
              {balancePositive ? (
                <LuTrendingUp size={12} />
              ) : (
                <LuTrendingDown size={12} />
              )}
            </div>
            ₹{Math.abs(data.balance)}
          </div>
        </div>
      )}
    </div>
  );
};

/* ================= COMPONENT ================= */

const CumulativeIncomeExpenseChart = ({ transactions }) => {
  const windowWidth = useWindowWidth() || window.innerWidth;
  const chartHeight = windowWidth > 400 ? 400 : 300;
  const chartYAxisWidth = windowWidth > 400 ? 70 : 55;
  const XAxisMarginGap = windowWidth > 400 ? 20 : 10;
  const chartXAxisHeight = windowWidth > 400 ? 20 : 5;
  const isMobile = windowWidth <= 400;

  const axisFontSize = isMobile ? 10 : 14;

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
  const AggregatedDataBlockRadius =
    AggregatedDataBlockCount > 10 ? 0 : [6, 6, 0, 0];

  const axisColor = darkMode ? "#9CA3AF" : "#4B5563";
  const gridColor = darkMode ? "#374151" : "#E5E7EB";

  const hoverCursor = {
    fill: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
  };

  return (
    <div
      className={`px-2 py-6 mob:px-6 rounded-none mob:rounded-xl sm:rounded-2xl border-t mob:border transition-colors duration-300 bg-gradient-to-b
        ${
          darkMode
            ? "from-gray-950 via-gray-950 to-gray-900 border-gray-600 shadow-lg shadow-gray-500/30"
            : "from-blue-50 via-blue-50 to-blue-100 border-blue-300 shadow-md shadow-gray-500/30"
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
          <BarChart data={individualData} margin={{bottom: XAxisMarginGap}}>
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis
              dataKey="label"
              stroke={axisColor}
              tick={{ fontSize: axisFontSize }}
              
            >
              <Label
                value="Transactions (Income/Expense)"
                position="insideBottom"
                dy={chartXAxisHeight}
                fill="#3B82F6"
                fontSize={axisFontSize}
                fontWeight={600}
              />
            </XAxis>
            <YAxis
              tick={CustomYAxisTick(axisFontSize)}
              axisLine={{ stroke: axisColor }}
              tickLine={false}
              width={chartYAxisWidth} // 👈 IMPORTANT: prevents extra empty space
            >
              <Label
                value="Amount (Income/Expense)"
                angle={-90}
                position="insideLeft"
                dy={chartHeight / 2 - 100} // 👈 centers vertically
                fill="#3B82F6"
                fontSize={axisFontSize}
                fontWeight={600}
              />
            </YAxis>

            <Tooltip
              content={({ active, payload }) => (
                <TooltipIndividual
                  active={active}
                  payload={payload}
                  darkMode={darkMode}
                />
              )}
              cursor={hoverCursor}
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
            <XAxis
              dataKey="date"
              stroke={axisColor}
              tick={{ fontSize: 10 }}
              angle={-55}
              tickMargin={15}
              dy={5}
              dx={-14}
              height={60}
            >
              <Label
                value="Income vs Expense (For Single Day)"
                position="insideBottom"
                dy={5}
                fill="#3B82F6"
                fontSize={axisFontSize}
                fontWeight={600}
              />
            </XAxis>
            <YAxis
              tick={CustomYAxisTick(axisFontSize)}
              axisLine={{ stroke: axisColor }}
              tickLine={false}
              width={chartYAxisWidth} // 👈 IMPORTANT: prevents extra empty space
            >
              <Label
                value="Amount (Income/Expense)"
                angle={-90}
                position="insideLeft"
                dy={chartHeight / 2 - 100} // 👈 centers vertically
                fill="#3B82F6"
                fontSize={axisFontSize}
                fontWeight={600}
              />
            </YAxis>
            <Tooltip
              content={({ active, payload }) => (
                <TooltipAggregate
                  active={active}
                  payload={payload}
                  darkMode={darkMode}
                  showDate={true}
                />
              )}
              cursor={hoverCursor}
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
            <CartesianGrid vertical={false} stroke={gridColor} />
            <XAxis stroke={axisColor} tick={{ fontSize: 10 }} fill="#3B82F6">
              <Label
                value="Grand Total for 1 Month"
                position="insideBottom"
                dy={5}
                fill="#3B82F6"
                fontSize={axisFontSize}
                fontWeight={600}
              />
            </XAxis>
            <YAxis
              tick={CustomYAxisTick(axisFontSize)}
              axisLine={{ stroke: axisColor }}
              tickLine={false}
              width={chartYAxisWidth} // 👈 IMPORTANT: prevents extra empty space
            >
              <Label
                value="Amount (Income/Expense)"
                angle={-90}
                position="insideLeft"
                dy={chartHeight / 2 - 100} // 👈 centers vertically
                fill="#3B82F6"
                fontSize={axisFontSize}
                fontWeight={600}
              />
            </YAxis>
            <Tooltip
              content={({ active, payload }) => (
                <TooltipAggregate
                  active={active}
                  payload={payload}
                  darkMode={darkMode}
                  showDate={false} // 👈 hides date
                />
              )}
              cursor={hoverCursor}
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
