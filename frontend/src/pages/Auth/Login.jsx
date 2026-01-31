import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { LuCircleAlert } from "react-icons/lu";

const Login = () => {
  const {darkMode} = useTheme();
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [name]: "",
        submit: "",
      },
    }));
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!validateEmail(formData.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      return setFormState({ loading: false, errors });
    }

    setFormState({ loading: true, errors: {} });

    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = data;

      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/dashboard");
    } catch (error) {
      setFormState({
        loading: false,
        errors: {
          submit:
            error.response?.data?.message ||
            "Login failed. Please check your credentials.",
        },
      });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}${
      API_PATHS.AUTH.GOOGLE_AUTH_URL
    }`;
  };

  return (
    <AuthLayout side="left">
      <div
        className={`
        w-full max-w-md p-5 mob:p-8 rounded-2xl
        bg-gradient-to-br
        ${
          darkMode
            ? "from-gray-950 via-gray-900 to-gray-950"
            : "from-blue-50 via-blue-100 to-blue-50"
        }
        shadow-xl
      `}
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Welcome back
          </h2>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm sm:text-base`}>
            Login to continue to JobiFy
          </p>
        </div>

        {/* Form */}
        <form className="space-y-2 mob:space-y-4" onSubmit={handleLogin}>
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            icon={FaEnvelope}
            placeholder="Enter your email"
            error={formState.errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            icon={FaLock}
            placeholder="Enter your password"
            error={formState.errors.password}
            required
          />

          {/* Error */}
          {formState.errors.submit && (
            <p
              className={`text-sm mt-1 flex items-center ${
                darkMode ? "text-red-400" : "text-red-500"
              }`}
            >
              <LuCircleAlert className="w-4 h-4 mr-1" />
              {formState.errors.submit}
            </p>
          )}

          {/* Forgot password */}
          {formState.errors.submit && (
            <div className="text-right mt-2">
              <Link
                to="/reset-password"
                className={`text-sm hover:underline ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Forgot password?
              </Link>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={formState.loading}
            className="
            w-full py-3 rounded-lg font-medium text-white
            bg-gradient-to-r from-blue-500 to-blue-600
            hover:from-blue-600 hover:to-blue-700
            transition disabled:opacity-70
          "
          >
            {formState.loading ? "Signing in..." : "SIGN IN"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div
              className={`flex-1 h-px ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              OR
            </span>
            <div
              className={`flex-1 h-px ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`
            w-full flex items-center justify-center gap-2 py-3 rounded-lg transition
            ${
              darkMode
                ? "border border-blue-500 text-blue-400 hover:bg-blue-900/30"
                : "border border-blue-300 text-blue-600 hover:bg-blue-50"
            }
          `}
          >
            <FaGoogle />
            Sign in with Google
          </button>

          {/* Bottom link */}
          <p
            className={`text-center text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className={`hover:underline ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );


};

export default Login;
