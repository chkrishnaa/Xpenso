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
} from "recharts";
import { truncateLabel } from "../../utils/helper";
import { useTheme } from "../../context/ThemeContext";

const CustomBarChart = ({ data = [], type = "expense", xKey }) => {
  const { darkMode } = useTheme();

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

  // Tooltip (surface only changes)
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

  // Hover background
  const hoverCursor = {
    fill: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        {/* GRID */}
        <CartesianGrid stroke={gridColor} vertical={false} horizontal />

        {/* X AXIS */}
        <XAxis
          dataKey={xKey}
          angle={-65}
          tickMargin={15}
          dy={8}
          dx={-10}
          height={60}
          stroke={axisColor}
          tick={{ fill: axisColor, fontSize: 11 }}
          tickFormatter={(value) => truncateLabel(value.split(" ")[0], 10)}
        />

        {/* Y AXIS */}
        <YAxis
          allowDecimals={false}
          stroke={axisColor}
          tick={{ fill: axisColor, fontSize: 12 }}
          tickLine={{ stroke: axisColor }}
          axisLine={{ stroke: axisColor }}
        />

        {/* TOOLTIP */}
        <Tooltip content={<CustomTooltip />} cursor={hoverCursor} />

        {/* BARS */}
        <Bar dataKey="amount">
          {data.map((_, index) => (
            <Cell key={index} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
