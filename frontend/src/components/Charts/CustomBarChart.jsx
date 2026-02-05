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
import moment from "moment"
import { truncateLabel } from "../../utils/helper";
import { useTheme } from "../../context/ThemeContext";
import { formatNumber } from "../../utils/helper";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";
import { useChartConfig } from "../../hooks/useChartConfig";

const CustomYAxisTick =
  (fontSize, axisColor) =>
  ({ x, y, payload }) => {
    return (
      <text
        x={x - 4}
        y={y}
        textAnchor="end"
        dominantBaseline="middle"
        fill={axisColor} // ✅ FIX: axis color
        fontSize={fontSize}
        fontWeight={500}
      >
        {formatNumber(Math.abs(payload.value))}
      </text>
    );
  };


const CustomBarChart = ({ data = [], type = "expense", xKey }) => {
  const { darkMode } = useTheme();

  const {
    height,
    yAxisWidth,
    axisFontSize,
    xAxisHeight,
    xAxisTickMargin,
    xAxisLabelDy,
    chartBottomMargin,
  } = useChartConfig();

  // Axis + grid colors (DO NOT CHANGE)
  const axisColor = type === "expense" ? "#EF4444" : "#16A34A";
  const gridColor =
    type === "expense" ? "rgba(239,68,68,0.25)" : "rgba(22,163,74,0.25)";

  // Bar colors (DO NOT CHANGE)
  const getBarColor = (index) => {
    if (type === "expense") {
      return index % 2 === 0 ? "#EF4444" : "#ff6b6b";
    }
    return index % 2 === 0 ? "#16A34A" : "#4ADE80";
  };

  const xAxisLabel =
    type === "expense" ? "Expense Categories" : "Income Sources";

  const yAxisLabel = type === "expense" ? "Expense Amount" : "Income Amount";

  // Tooltip (surface only changes)
  const CustomTooltip = ({ active, payload, darkMode }) => {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;

    const isIncome = type === "income";

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

  const barCount = data.length;
  const barRadius = barCount > 10 ? 0 : [6, 6, 0, 0];


  // Hover background
  const hoverCursor = {
    fill: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        margin={{ bottom: chartBottomMargin }} // ✅ key fix
      >
        <CartesianGrid stroke={gridColor} vertical={false} />

        {/* X AXIS */}
        <XAxis
          dataKey={xKey}
          angle={-65}
          dx={-10}
          height={xAxisHeight}
          tickMargin={xAxisTickMargin}
          stroke={axisColor}
          tick={{ fill: axisColor, fontSize: axisFontSize }}
          tickFormatter={(v) => truncateLabel(v.split(" ")[0], 10)}
        >
          <Label
            value={xAxisLabel}
            position="insideBottom"
            dy={xAxisLabelDy} // ✅ desktop spacing
            fill={axisColor}
            fontSize={axisFontSize}
            fontWeight={600}
          />
        </XAxis>

        {/* Y AXIS */}
        <YAxis
          allowDecimals={false}
          width={yAxisWidth}
          stroke={axisColor}
          tick={CustomYAxisTick(axisFontSize, axisColor)}
          tickLine={{ stroke: axisColor }}
          axisLine={{ stroke: axisColor }}
        >
          <Label
            value={yAxisLabel}
            angle={-90}
            position="insideLeft"
            dy={height / 2 - 100}
            fill={axisColor}
            fontSize={axisFontSize}
            fontWeight={600}
          />
        </YAxis>

        <Tooltip
          cursor={hoverCursor}
          content={(props) => <CustomTooltip {...props} darkMode={darkMode} />}
        />

        <Bar dataKey="amount" radius={barRadius}>
          {data.map((_, i) => (
            <Cell key={i} fill={getBarColor(i)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
