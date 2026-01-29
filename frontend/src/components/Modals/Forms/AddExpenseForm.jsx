import React, { useState } from "react";
import Input from "../../Inputs/Input";
import { LuHandCoins, LuCoins, LuCalendar } from "react-icons/lu";
import EmojiPickerPopup from "../../Utility/EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

  return (
    <div className="space-y-4">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(emoji) => handleChange("icon", emoji)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense Category"
        placeholder="Food, Entertainment, etc."
        type="text"
        icon={LuHandCoins}
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
        icon={LuCoins}
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder="Enter date"
        type="date"
        icon={LuCalendar}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
