import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import ProfilePhoto from "../../components/Inputs/ProfilePhoto";
import { useTheme } from "../../context/ThemeContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const {darkMode} = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
  });

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [name]: "", submit: "" },
    }));
  };

  // 🔹 Manual Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.name.trim()) errors.name = "Full name is required.";
    if (!validateEmail(formData.email))
      errors.email = "Enter a valid email address.";
    if (!formData.password || formData.password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    if (Object.keys(errors).length > 0) {
      return setFormState({ loading: false, errors });
    }

    setFormState({ loading: true, errors: {} });

    try {
      // 1️⃣ Register user
      const { data } = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = data;

      // 2️⃣ Save token
      localStorage.setItem("token", token);

      // 3️⃣ Upload avatar (optional)
      if (formData.image) {
        const imageData = new FormData();
        imageData.append("image", formData.image);

        await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_AVATAR, imageData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // 4️⃣ Update context & redirect
      updateUser(user);
      navigate("/dashboard");
    } catch (error) {
      setFormState({
        loading: false,
        errors: {
          submit:
            error.response?.data?.message || "Signup failed. Please try again.",
        },
      });
    }
  };

  // 🔹 Google Signup (SAME FLOW AS LOGIN)
  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}${
      API_PATHS.AUTH.GOOGLE_AUTH_URL
    }`;
    
  };

  return (
    <AuthLayout side="right">
      <div
        className={`
        w-full max-w-md p-8 rounded-2xl shadow-xl
        bg-gradient-to-br
        ${
          darkMode
            ? "from-gray-900 via-green-900/40 to-gray-900"
            : "from-green-50 via-green-100 to-green-50"
        }
      `}
      >
        {/* Heading + Profile Photo */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2
              className={`text-2xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Create an account
            </h2>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Join Xpenso to manage your finances
            </p>
          </div>

          <ProfilePhoto
            image={formData.image}
            setImage={(file) =>
              setFormData((prev) => ({ ...prev, image: file }))
            }
          />
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignup}>
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={FaUser}
            placeholder="Enter your full name"
            error={formState.errors.name}
          />

          <Input
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            icon={FaEnvelope}
            placeholder="Enter your email"
            error={formState.errors.email}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              icon={FaLock}
              placeholder="Create password"
              error={formState.errors.password}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={FaLock}
              placeholder="Confirm password"
              error={formState.errors.confirmPassword}
            />
          </div>

          {/* Error */}
          {formState.errors.submit && (
            <p
              className={`text-sm text-center ${
                darkMode ? "text-red-400" : "text-red-500"
              }`}
            >
              {formState.errors.submit}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={formState.loading}
            className="
            w-full py-3 rounded-lg font-medium text-white
            bg-gradient-to-r from-green-500 to-green-600
            hover:from-green-600 hover:to-green-700
            transition disabled:opacity-70
          "
          >
            {formState.loading ? "Creating account..." : "SIGN UP"}
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

          {/* Google Signup */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className={`
            w-full flex items-center justify-center gap-2 py-3 rounded-lg transition
            ${
              darkMode
                ? "border border-green-500 text-green-400 hover:bg-green-900/30"
                : "border border-green-300 text-green-600 hover:bg-green-50"
            }
          `}
          >
            <FaGoogle />
            Sign up with Google
          </button>

          {/* Bottom link */}
          <p
            className={`text-center text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className={`hover:underline ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );

};

export default SignUp;
