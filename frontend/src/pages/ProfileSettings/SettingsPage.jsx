import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
// import NotificationToggle from "./NotificationToggle";
// import ThemeToggle from "./ThemeToggle";

const SettingsPage = () => {
  const { user, updateUser } = useContext(UserContext);
  const { darkMode, toggleDarkMode } = useTheme();
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState({
    monthlySummaryEnabled: false,
    largeTransactionAlertsEnabled: false,
  });

  useEffect(() => {
    if (!user) return;
    setPreferences({
      monthlySummaryEnabled: !!user.monthlySummaryEnabled,
      largeTransactionAlertsEnabled: !!user.largeTransactionAlertsEnabled,
    });
  }, [user]);

  if (!user) return null;

  const handleSavePreferences = async (updates) => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(
        API_PATHS.USER.UPDATE_PREFERENCES,
        updates
      );
      if (response.data?.success) {
        updateUser(response.data.user);
      }
    } catch (error) {
      console.error("Save preferences error:", error);
    } finally {
      setSaving(false);
    }
  };

  const togglePreference = async (key) => {
    const updatedPrefs = {
      ...preferences,
      [key]: !preferences[key],
    };

    setPreferences(updatedPrefs);
    await handleSavePreferences({ [key]: updatedPrefs[key] });
  };

  const handleThemeToggle = async () => {
    const nextTheme = darkMode ? "light" : "dark";
    toggleDarkMode();
    await handleSavePreferences({ themePreference: nextTheme });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div
        className={`rounded-[2rem] border p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] ${
          darkMode
            ? "bg-slate-950 border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-8">Settings</h2>

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <NotificationToggle
              label="Monthly summary"
              enabled={preferences.monthlySummaryEnabled}
              onChange={() => togglePreference("monthlySummaryEnabled")}
            />
            <NotificationToggle
              label="Large transaction alerts"
              enabled={preferences.largeTransactionAlertsEnabled}
              onChange={() => togglePreference("largeTransactionAlertsEnabled")}
            />
            <NotificationToggle
              label="Product updates"
              enabled={false}
              onChange={() => {}}
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Appearance</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Theme mode
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-base font-semibold">
                    {darkMode ? "Dark" : "Light"}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Use the look that feels best.
                  </p>
                </div>
                <ThemeToggle
                  darkMode={darkMode}
                  onToggle={handleThemeToggle}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Currency
              </div>
              <div className="mt-3 text-base font-semibold">INR (₹)</div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Email
              </p>
              <p className="mt-2 font-semibold">{user.email}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Verification
              </p>
              <p className="mt-2 font-semibold">
                {user.isAccountVerified ? "Verified" : "Not verified"}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Theme preferences and notification settings are saved automatically.
          </div>
          <button
            type="button"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {saving ? "Saving..." : "Save preferences"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
