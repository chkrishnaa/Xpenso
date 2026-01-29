import React, { useState } from "react";
import Input from "../../../components/Inputs/Input";
import { LuWalletMinimal, LuCoins, LuCalendar } from "react-icons/lu";
import EmojiPickerPopup from "../../Utility/EmojiPickerPopup";
import { useTheme } from "../../../context/ThemeContext";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const { darkMode } = useTheme();

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className="space-y-4">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(emoji) => handleChange("icon", emoji)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Salary, Freelance, etc."
        type="text"
        icon={LuWalletMinimal}
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        icon={LuCoins}
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder="Enter date"
        type="date"
        icon={LuCalendar}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => onAddIncome(income)}
          className={`text-sm px-3 py-2 rounded-md transition
            ${
              darkMode
                ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
          `}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
