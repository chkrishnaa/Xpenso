import React from 'react'
import { useTheme } from '../../context/ThemeContext';

const ContentArea = () => {
  const {darkMode} = useTheme();
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <img
        src={`/assets/AuthImages/LoginSignup-${
          darkMode ? "dark" : "light"
        }.png`}
        alt="Login and Signup Section Image"
        className="w-full h-full object-cover"
      />

      <div className="absolute h-15 flex justify-between items-center top-3 right-10">
        <p className='text-3xl font-bold'>Xpenso</p>
      </div>
    </div>
  );
}

export default ContentArea
