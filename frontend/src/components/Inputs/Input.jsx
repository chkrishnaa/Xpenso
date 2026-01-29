import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LuCircleAlert } from "react-icons/lu";

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  icon: Icon,
  placeholder,
  required,
  error,
}) => {
  const { darkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <label
        className={`block text-sm font-medium ${
          darkMode ? "text-gray-200" : "text-gray-700"
        } mb-2`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        )}

        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-2 py-3 rounded-lg border text-sm
            ${
              error
                ? darkMode
                  ? "border-red-400 bg-gray-800 text-gray-300 placeholder-gray-500"
                  : "border-red-500 bg-white text-gray-900 placeholder-gray-400"
                : darkMode
                ? "border-gray-700 bg-gray-800 text-gray-300"
                : "border-gray-300 bg-white text-gray-900"
            }
            focus:ring-purple-500 focus:border-transparent`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {error && (
        <p
          className={`${
            darkMode ? "text-red-400" : "text-red-500"
          } text-sm mt-1 flex items-center`}
        >
          <LuCircleAlert className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
