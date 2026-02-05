import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label,
} from "recharts";
import moment from "moment";
import { LuTrendingUp } from "react-icons/lu";

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

const IncomeBarChart = ({ data = [], type = "income", xKey }) => {
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
  } = useChartConfig();

  /* ===== Colors ===== */
  const axisColor = type === "expense" ? "#EF4444" : "#16A34A";
  const gridColor =
    type === "expense" ? "rgba(239,68,68,0.25)" : "rgba(22,163,74,0.25)";

  /* ===== Labels ===== */
  const xAxisLabel =
    type === "expense" ? "Expense Categories" : "Income Sources";
  const yAxisLabel = type === "expense" ? "Expense Amount" : "Income Amount";

  /* ===== Bar colors ===== */
  const getBarColor = (index) =>
    type === "expense"
      ? index % 2 === 0
        ? "#EF4444"
        : "#ff6b6b"
      : index % 2 === 0
      ? "#16A34A"
      : "#4ADE80";

  /* ===== Tooltip ===== */
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const { source, amount, createdAt } = payload[0].payload;

    return (
      <div
        className={`
          min-w-[200px] mob:min-w-[250px] rounded-xl border border-income
          bg-gradient-to-b shadow-none mob:shadow-lg
          p-3 mob:p-4
          transition-all duration-200
          ${
            darkMode
              ? "from-gray-950 via-gray-950 to-gray-900 shadow-green-500/20 text-gray-200"
              : "from-green-50 via-green-50 to-green-100 shadow-green-500/20 text-gray-800"
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] mob:text-xs font-semibold uppercase tracking-wide text-green-500">
            Income
          </span>

          <div
            className={`rounded-full px-2 py-1 ${
              darkMode ? "bg-green-400/30" : "bg-green-500"
            }`}
          >
            <LuTrendingUp
              size={12}
              className={darkMode ? "text-green-400" : "text-white"}
            />
          </div>
        </div>

        {/* SOURCE */}
        <p className="text-xs mob:text-sm font-medium mb-2 text-green-500">
          Source: <span className="font-semibold">{source}</span>
        </p>

        {/* AMOUNT */}
        <p className="text-xs mob:text-sm mb-3">
          Amount:&nbsp;
          <span className="font-semibold text-green-500">
            +₹{Math.abs(amount)}
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

  const barRadius = data.length > 10 ? 0 : [6, 6, 0, 0];

  const hoverCursor = {
    fill: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
  };

  /* ================= RENDER ================= */

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        data={data}
        margin={{ bottom: chartBottomMargin }} // ✅ desktop-only spacing
      >
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
          allowDecimals={false}
          width={chartYAxisWidth}
          stroke={axisColor}
          tick={CustomYAxisTick(axisFontSize, axisColor)}
          tickLine={{ stroke: axisColor }}
          axisLine={{ stroke: axisColor }}
        >
          <Label
            value={yAxisLabel}
            angle={-90}
            position="insideLeft"
            dy={chartHeight / 2 - 100}
            fill={axisColor}
            fontSize={axisFontSize}
            fontWeight={600}
          />
        </YAxis>

        {/* TOOLTIP */}
        <Tooltip
          content={(props) => <CustomTooltip {...props} />}
          cursor={hoverCursor}
        />

        {/* BARS */}
        <Bar dataKey="amount" radius={barRadius}>
          {data.map((_, index) => (
            <Cell key={index} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeBarChart;
