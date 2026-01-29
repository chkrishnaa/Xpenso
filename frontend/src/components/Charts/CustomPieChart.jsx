import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomLegend from "./CustomLegend";
import { useTheme } from "../../context/ThemeContext";

const CustomPieChart = ({ ...props }) => {
  const { darkMode } = useTheme();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`rounded-lg p-2 border shadow-md
            ${
              darkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-300"
            }
          `}
        >
          <p
            className={`text-xs font-semibold mb-1 ${
              darkMode ? "text-gray-200" : "text-purple-800"
            }`}
          >
            {payload[0].name}
          </p>

          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Amount:{" "}
            <span
              className={`font-medium ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              {payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={props.data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={130}
          labelLine={false}
          stroke={darkMode ? "#111827" : "#ffffff"}
          strokeWidth={1}
        >
          {props.data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={props.colors[index % props.colors.length]}
            />
          ))}
        </Pie>

        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} />

        {props.showTextAnchor && (
          <>
            {/* Label */}
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill={darkMode ? "#9CA3AF" : "#666"}
              fontSize="14px"
            >
              {props.label}
            </text>

            {/* Total */}
            <text
              x="50%"
              y="50%"
              dy={10}
              textAnchor="middle"
              fill={darkMode ? "#F9FAFB" : "#333"}
              fontSize="24px"
              fontWeight={600}
            >
              {props.totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
