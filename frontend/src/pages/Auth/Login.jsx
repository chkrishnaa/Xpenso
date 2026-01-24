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
  const darkMode = useTheme();
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

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
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


  return (
    <AuthLayout side="left">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-300">Login to continue to JobiFy</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
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

          {formState.errors.submit && (
            <p
              className={`${
                darkMode ? "text-red-400" : "text-red-500"
              } text-sm mt-1 flex items-center`}
            >
              <LuCircleAlert className="w-4 h-4 mr-1" />
              {formState.errors.submit}
            </p>
          )}

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-300 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full bg-purple-300 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-70"
          >
            {formState.loading ? "Signing in..." : "SIGN IN"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2
             border border-purple-300 text-purple-300
             py-3 rounded-lg hover:bg-purple-50 transition"
          >
            <FaGoogle />
            Sign in with Google
          </button>

          {/* Bottom link */}
          <p className="text-center text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-300 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
