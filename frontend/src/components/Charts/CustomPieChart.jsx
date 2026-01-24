import React from 'react'
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,} from 'recharts'
// import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({...props}) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].name}
          </p>
          <p className="text-sm text-gray-300">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
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
        >
          {props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={props.colors[index % props.colors.length]} />
          ))}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend}/>

        {props.showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {props.label}
            </text>

            <text
              x="50%"
              y="50%"
              dy={10}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="semi-bold"
            >
              {props.totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart
