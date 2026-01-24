import React, { useState } from 'react'
import Input from '../../../components/Inputs/Input'
import { LuWalletMinimal, LuCoins, LuCalendar } from "react-icons/lu";
import EmojiPickerPopup from '../../Utility/EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {
    const [income, setIncome] = useState({
        source:"",
        amount:"",
        date:"",
        icon:"",
    });

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div className='space-y-4'>
        <EmojiPickerPopup 
        icon={income.icon}
        onSelect={(emoji) => handleChange("icon", emoji)}
        />
      <Input
      value={income.source}
      onChange= {({target})=> handleChange("source", target.value)}
      label="Income Source"
      placeholder="Salary, Freelance, etc."
      type="text"
      icon={LuWalletMinimal}
      />

      <Input
      value={income.amount}
      onChange= {({target})=> handleChange("amount", target.value)}
      label="Amount"
      placeholder="Enter amount"
      type="number"
      icon={LuCoins}
      />

      <Input
      value={income.date}
      onChange= {({target})=> handleChange("date", target.value)}
      label="Date"
      placeholder="Enter date"
      type="date"
      icon={LuCalendar}
      />

      <div className="flex justify-end mt-6">
        <button type="button"
        className='text-sm bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md'
        onClick={() => onAddIncome(income)}>Add Income</button>
      </div>
    </div>
  )
}

export default AddIncomeForm
