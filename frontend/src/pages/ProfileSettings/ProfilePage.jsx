import React, { useContext } from "react";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { UserContext } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";

const SummaryCard = ({ label, value, color }) => {
  const colorMap = {
    green: "text-green-500 bg-green-500/10",
    red: "text-red-500 bg-red-500/10",
    blue: "text-blue-500 bg-blue-500/10",
    rose: "text-rose-500 bg-rose-500/10",
  };

  return (
    <div className={`rounded-xl p-4 ${colorMap[color]}`}>
      <p className="text-xs uppercase tracking-wide opacity-80">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
};

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  if (!user) return null;

  // 🔹 Placeholder totals (replace with API later)
  const totalIncome = 125000;
  const totalExpense = 84500;
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div
        className={`rounded-xl border p-6 ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center gap-5 mb-6">
          {user.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
              {user.fullName.charAt(0)}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{user.fullName}</h2>

              {user.isAccountVerified && (
                <MdVerified
                  className="text-income"
                  size={20}
                  title="Email verified"
                />
              )}
            </div>

            <p className="text-sm text-gray-400">{user.email}</p>

            {!user.isAccountVerified && (
              <button
                onClick={() => navigate("/verify-email")}
                className="mt-2 text-xs px-3 py-1 rounded-full bg-yellow-500 text-black hover:bg-yellow-600"
              >
                Verify Email
              </button>
            )}
          </div>
        </div>

        {/* FINANCIAL SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <SummaryCard
            label="Total Income"
            value={`₹${totalIncome.toLocaleString()}`}
            color="green"
          />
          <SummaryCard
            label="Total Expense"
            value={`₹${totalExpense.toLocaleString()}`}
            color="red"
          />
          <SummaryCard
            label="Net Balance"
            value={`₹${netBalance.toLocaleString()}`}
            color={netBalance >= 0 ? "blue" : "rose"}
          />
        </div>

        {/* ABOUT */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>

        {/* META INFO */}
        <div className="text-sm text-gray-400 space-y-1 mb-6">
          <p>
            Member since: <b>{moment(user.createdAt).format("MMMM YYYY")}</b>
          </p>
          <p>
            Last login: <i>Coming soon</i>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
