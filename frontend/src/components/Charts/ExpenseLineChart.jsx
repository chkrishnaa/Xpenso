import React from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import moment from "moment";
import { LuTrendingDown } from "react-icons/lu";

import { useTheme } from "../../context/ThemeContext";
import { formatNumber } from "../../utils/helper";
import { useChartConfig } from "../../hooks/useChartConfig";

/* ================= Y AXIS TICK ================= */

const CustomYAxisTick =
  (fontSize, axisColor) =>
  ({ x, y, payload }) =>
    (
      <text
        x={x - 4}
        y={y}
        textAnchor="end"
        dominantBaseline="middle"
        fill={axisColor}
        fontSize={fontSize}
        fontWeight={500}
      >
        {formatNumber(Math.abs(payload.value))}
      </text>
    );

/* ================= CHART ================= */

const ExpenseLineChart = ({ data = [], type = "expense", xKey }) => {
  const { darkMode } = useTheme();

  /* ===== Responsive config (SINGLE SOURCE) ===== */
  const {
    height: chartHeight,
    yAxisWidth: chartYAxisWidth,
    axisFontSize,
    xAxisHeight,
    xAxisTickMargin,
    xAxisLabelDy,
    chartBottomMargin,
    isMobile,
  } = useChartConfig();

  /* ===== Colors ===== */
  const axisColor = type === "expense" ? "#EF4444" : "#16A34A";
  const gridColor =
    type === "expense" ? "rgba(239,68,68,0.25)" : "rgba(22,163,74,0.25)";

  /* ===== Labels ===== */
  const xAxisLabel =
    type === "expense" ? "Expense Transactions" : "Income Transactions";
  const yAxisLabel = type === "expense" ? "Expense Amount" : "Income Amount";

  /* ===== Gradient ===== */
  const gradientId = `areaGradient-${type}`;

  /* ===== Tooltip ===== */
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const { category, amount, createdAt } = payload[0].payload;

    return (
      <div
        className={`
          min-w-[200px] mob:min-w-[250px] rounded-xl border border-expense
          bg-gradient-to-b shadow-none mob:shadow-lg
          p-3 mob:p-4
          transition-all duration-200
          ${
            darkMode
              ? "from-gray-950 via-gray-950 to-gray-900 shadow-red-500/20 text-gray-200"
              : "from-red-50 via-red-50 to-red-100 shadow-red-500/20 text-gray-800"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] mob:text-xs font-semibold uppercase tracking-wide text-red-500">
            Expense
          </span>

          <div
            className={`rounded-full px-2 py-1 ${
              darkMode ? "bg-red-400/30" : "bg-red-400"
            }`}
          >
            <LuTrendingDown
              size={12}
              className={darkMode ? "text-red-400" : "text-white"}
            />
          </div>
        </div>

        {/* CATEGORY */}
        <p className="text-xs mob:text-sm font-medium mb-2 text-red-500">
          Category: <span className="font-semibold">{category}</span>
        </p>

        {/* AMOUNT */}
        <p className="text-xs mob:text-sm mb-3">
          Amount:&nbsp;
          <span className="font-semibold text-red-500">
            -₹{Math.abs(amount)}
          </span>
        </p>

        {/* DIVIDER */}
        <div
          className={`my-2 h-px w-full ${
            darkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
        />

        {/* DATE & TIME */}
        {createdAt && (
          <div
            className={`flex flex-col items-end text-[10px] mob:text-xs ${
              darkMode ? "text-gray-400" : "text-gray-700"
            }`}
          >
            <span>{moment(createdAt).format("Do MMM YYYY, hh:mm A")}</span>
          </div>
        )}
      </div>
    );
  };

  /* ================= RENDER ================= */

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <AreaChart
        data={data}
        margin={{ bottom: chartBottomMargin }} // ✅ desktop-only spacing
      >
        {/* GRADIENT */}
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={axisColor} stopOpacity={0.35} />
            <stop offset="95%" stopColor={axisColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* GRID */}
        <CartesianGrid stroke={gridColor} vertical={false} />

        {/* X AXIS */}
        <XAxis
          dataKey={xKey}
          angle={-65}
          height={xAxisHeight}
          tickMargin={xAxisTickMargin}
          stroke={axisColor}
          tick={{ fill: axisColor, fontSize: axisFontSize }}
          tickFormatter={(_, index) => data[index]?.displayDate || ""}
        >
          <Label
            value={xAxisLabel}
            position="insideBottom"
            dy={xAxisLabelDy} // ✅ prevents overlap
            fill={axisColor}
            fontSize={axisFontSize}
            fontWeight={600}
          />
        </XAxis>

        {/* Y AXIS */}
        <YAxis
          stroke={axisColor}
          width={chartYAxisWidth}
          tick={CustomYAxisTick(axisFontSize, axisColor)}
          tickLine={{ stroke: axisColor }}
          axisLine={{ stroke: axisColor }}
        >
          <Label
            value={yAxisLabel}
            angle={-90}
            position="insideLeft"
            dy={chartHeight / 2 - (isMobile ? 70 : 100)}
            fill={axisColor}
            fontSize={axisFontSize}
            fontWeight={600}
          />
        </YAxis>

        {/* TOOLTIP */}
        <Tooltip
          content={(props) => <CustomTooltip {...props} />}
          cursor={{
            stroke: axisColor,
            strokeDasharray: "3 3",
          }}
        />

        {/* AREA */}
        <Area
          dataKey="amount"
          type="monotone"
          stroke={axisColor}
          strokeWidth={3}
          fill={`url(#${gradientId})`}
          dot={{ r: isMobile ? 2 : 3, fill: axisColor }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ExpenseLineChart;
