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

const CustomBarChart = ({ data = [], type = "expense", xKey}) => {
  // Axis + grid colors based on type
  const axisColor = type === "expense" ? "#EF4444" : "#16A34A";
  const gridColor =
    type === "expense" ? "rgba(239,68,68,0.25)" : "rgba(22,163,74,0.25)";

  // Bar colors (alternating shades)
  const getBarColor = (index) => {
    if (type === "expense") {
      return index % 2 === 0 ? "#EF4444" : "#ff6b6b";
    }
    return index % 2 === 0 ? "#16A34A" : "#4ADE80";
  };

  // Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, amount, date } = payload[0].payload;

      return (
        <div className="bg-white shadow-md rounded-lg p-3 border border-gray-300">
          <p
            className="text-xs font-semibold mb-1"
            style={{ color: axisColor }}
          >
            {name}
          </p>

          <p className="text-sm text-gray-700">
            Amount:
            <span className="ml-1 font-medium text-gray-900">₹{amount}</span>
          </p>

          {date && (
            <p className="text-xs text-gray-500 mt-1">
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
      <BarChart data={data}>
        {/* GRID */}
        <CartesianGrid
          stroke={gridColor}
          strokeDasharray="none"
          vertical={false}
          horizontal={true}
        />

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

        {/* BARS */}
        <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
