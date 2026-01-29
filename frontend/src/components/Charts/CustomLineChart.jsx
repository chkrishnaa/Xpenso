import React from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const CustomLineChart = ({ data = [], type = "expense", xKey }) => {
  const { darkMode } = useTheme();

  // Axis + grid colors (DO NOT CHANGE)
  const axisColor = type === "expense" ? "#EF4444" : "#16A34A";
  const gridColor =
    type === "expense" ? "rgba(239,68,68,0.25)" : "rgba(22,163,74,0.25)";

  // Gradient base color (FIX)
  const gradientColor = axisColor;
  const gradientId = `areaGradient-${type}`;

  // Tooltip (surface only)
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, amount, date } = payload[0].payload;

      return (
        <div
          className={`rounded-lg p-3 border shadow-md
            ${
              darkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-300"
            }
          `}
        >
          <p
            className="text-xs font-semibold mb-1"
            style={{ color: axisColor }}
          >
            {name}
          </p>

          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Amount:
            <span
              className={`ml-1 font-medium ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              ₹{amount}
            </span>
          </p>

          {date && (
            <p
              className={`text-xs mt-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {new Date(date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        {/* ✅ CORRECT GRADIENT */}
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.35} />
            <stop offset="95%" stopColor={gradientColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* GRID */}
        <CartesianGrid stroke={gridColor} vertical={false} horizontal />

        {/* X AXIS */}
        <XAxis
          dataKey={xKey}
          stroke={axisColor}
          tick={{ fill: axisColor, fontSize: 12 }}
          tickLine={{ stroke: axisColor }}
          axisLine={{ stroke: axisColor }}
        />

        {/* Y AXIS */}
        <YAxis
          stroke={axisColor}
          tick={{ fill: axisColor, fontSize: 12 }}
          tickLine={{ stroke: axisColor }}
          axisLine={{ stroke: axisColor }}
        />

        {/* TOOLTIP */}
        <Tooltip content={<CustomTooltip />} />

        {/* AREA */}
        <Area
          dataKey="amount"
          type="monotone"
          stroke={axisColor}
          strokeWidth={3}
          fill={`url(#${gradientId})`}
          dot={{ r: 3, fill: axisColor }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
