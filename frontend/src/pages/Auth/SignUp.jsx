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

const SignUp = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

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

  // 🔹 Handle input change + clear field errors
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

  // 🔹 Submit
  const handleSignup = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required.";
    }

    if (!validateEmail(formData.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      return setFormState({ loading: false, errors });
    }

    setFormState({ loading: true, errors: {} });

    try {
      // 1️⃣ REGISTER USER
      const { data } = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = data;

      // 2️⃣ SAVE TOKEN FIRST
      localStorage.setItem("token", token);

      // 3️⃣ UPLOAD PROFILE IMAGE (OPTIONAL)
      if (formData.image) {
        const imageData = new FormData();
        imageData.append("image", formData.image);

        await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_AVATAR, imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // 4️⃣ UPDATE CONTEXT & REDIRECT
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


  return (
    <AuthLayout side="right">
      <div className="w-full max-w-md">
        {/* Heading */}
        <div className="flex justify-between">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Create an account
            </h2>
            <p className="text-gray-300">Join JobiFy to manage your finances</p>
          </div>

          <ProfilePhoto image={formData.image} setImage={setFormData} />
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignup}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={FaUser}
            placeholder="Enter your full name"
            error={formState.errors.name}
            required
          />

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

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              icon={FaLock}
              placeholder="Create a password"
              error={formState.errors.password}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={FaLock}
              placeholder="Re-enter your password"
              error={formState.errors.confirmPassword}
              required
            />
          </div>

          {/* Submit error */}
          {formState.errors.submit && (
            <p className="text-red-500 text-sm text-center">
              {formState.errors.submit}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full bg-purple-300 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-70"
          >
            {formState.loading ? "Creating account..." : "SIGN UP"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google Signup */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2
              border border-purple-300 text-purple-300
              py-3 rounded-lg hover:bg-purple-50 transition"
          >
            <FaGoogle />
            Sign up with Google
          </button>

          {/* Bottom link */}
          <p className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-300 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
