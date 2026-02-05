import React from "react";
import moment from "moment";
import { LuTrendingUp, LuTrendingDown } from "react-icons/lu";

const CustomTransactionTooltip = ({ active, payload, darkMode }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  const isIncome = data.amount >= 0 || data.type === "income";
  const amount = Math.abs(Number(data.amount));

  const primaryColor = isIncome ? "#16A34A" : "#EF4444";
  const borderColor = isIncome
    ? darkMode
      ? "border-green-600"
      : "border-green-400"
    : darkMode
    ? "border-red-600"
    : "border-red-400";

  const title = isIncome ? "Income" : "Expense";
  const label = isIncome
    ? data.source || "Income Source"
    : data.category || "Expense Category";

  return (
    <div
      className={`min-w-[220px] rounded-lg border ${borderColor} shadow-lg p-3
        ${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <h6
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: primaryColor }}
        >
          {title}
        </h6>

        {isIncome ? (
          <LuTrendingUp size={16} color={primaryColor} />
        ) : (
          <LuTrendingDown size={16} color={primaryColor} />
        )}
      </div>

      {/* SOURCE / CATEGORY */}
      <p className="text-sm font-medium mb-1" style={{ color: primaryColor }}>
        {label}
      </p>

      {/* AMOUNT */}
      <p className="text-sm mb-2">
        Amount:&nbsp;
        <span className="font-semibold" style={{ color: primaryColor }}>
          {isIncome ? "+" : "-"}₹{amount}
        </span>
      </p>

      {/* DATE */}
      {data.createdAt && (
        <>
          <p className="text-xs text-gray-400">
            {moment(data.createdAt).format("Do MMM YYYY")}
          </p>
          <p className="text-xs text-gray-400">
            {moment(data.createdAt).format("hh:mm A")}
          </p>
        </>
      )}
    </div>
  );
};

export default CustomTransactionTooltip;
