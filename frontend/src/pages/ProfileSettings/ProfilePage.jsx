import React, { useContext, useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { UserContext } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const SummaryCard = ({ label, value, color }) => {
  const colorMap = {
    green: "text-green-600 bg-emerald-100/80",
    red: "text-red-600 bg-rose-100/80",
    blue: "text-sky-600 bg-sky-100/80",
    slate: "text-slate-700 bg-slate-100/80",
  };

  return (
    <div className={`rounded-3xl p-5 ${colorMap[color]}`}>
      <p className="text-xs uppercase tracking-[0.2em] opacity-80">{label}</p>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
    </div>
  );
};

const ProfilePage = () => {
  const { user, updateUser } = useContext(UserContext);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [dashboardTotals, setDashboardTotals] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
  });

  useEffect(() => {
    if (!user) return;

    const loadDashboardTotals = async () => {
      try {
        const { data } = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
        if (data?.success) {
          setDashboardTotals({
            totalIncome: data.totalIncome || 0,
            totalExpense: data.totalExpense || 0,
            totalBalance: data.totalBalance || 0,
          });
        }
      } catch (error) {
        console.error("Failed loading dashboard totals", error);
      }
    };

    loadDashboardTotals();
  }, [user]);

  if (!user) return null;

  const netBalance = dashboardTotals.totalBalance;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div
        className={`rounded-[2rem] border p-6 shadow-[0_24px_80px_-60px_rgba(15,23,42,0.35)] ${
          darkMode
            ? "bg-slate-950 border-slate-800 text-slate-200"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-sky-600 to-cyan-500 text-white shadow-lg shadow-sky-500/20">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="h-20 w-20 rounded-[1.75rem] object-cover"
                />
              ) : (
                <span className="text-3xl font-semibold">{user.fullName.charAt(0)}</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{user.fullName}</h1>
                {user.isAccountVerified && (
                  <MdVerified className="text-emerald-500" size={24} />
                )}
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
              {user.authProvider === "google" ? (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Signed in with Google</p>
              ) : (
                <button
                  onClick={() => navigate("/reset-password")}
                  className="mt-3 inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Update Password
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryCard
              label="Total Income"
              value={`₹${dashboardTotals.totalIncome.toLocaleString()}`}
              color="green"
            />
            <SummaryCard
              label="Total Expense"
              value={`₹${dashboardTotals.totalExpense.toLocaleString()}`}
              color="red"
            />
            <SummaryCard
              label="Net Balance"
              value={`₹${netBalance.toLocaleString()}`}
              color={netBalance >= 0 ? "blue" : "slate"}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold mb-4">Member details</h2>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex justify-between gap-3">
                <span className="font-medium">Member since</span>
                <span>{moment(user.createdAt).format("MMMM YYYY")}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="font-medium">Email verified</span>
                <span>{user.isAccountVerified ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="font-medium">Auth provider</span>
                <span>{user.authProvider}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold mb-4">Quick facts</h2>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              Xpenso summarizes your finances instantly. Use the dashboard to see monthly totals and smart alerts for big income or expense entries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
