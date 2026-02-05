import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";

const Toggle = ({ enabled }) => (
  <div
    className={`w-10 h-5 rounded-full transition ${
      enabled ? "bg-blue-600" : "bg-gray-400"
    }`}
  />
);

const SettingsPage = () => {
  const { user } = useContext(UserContext);
  const { darkMode } = useTheme();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div
        className={`rounded-xl border p-6 ${
          darkMode
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <h2 className="text-xl font-semibold mb-6">Settings</h2>

        {/* ACCOUNT */}
        <section className="mb-6">
          <h3 className="font-semibold mb-2">Account</h3>
          <p className="text-sm text-gray-400">
            Email: <b>{user.email}</b>
          </p>
          <p className="text-sm text-gray-400">
            Email verified: <b>{user.isAccountVerified ? "Yes" : "No"}</b>
          </p>
          <p className="text-sm text-gray-400">
            Auth provider: <b>{user.authProvider}</b>
          </p>
        </section>

        {/* SECURITY */}
        <section className="mb-6">
          <h3 className="font-semibold mb-2">Security & Login</h3>
          {user.authProvider === "google" ? (
            <p className="text-sm text-gray-400">
              Password is managed by Google.
            </p>
          ) : (
            <button className="text-sm px-3 py-1 rounded-lg bg-blue-600 text-white">
              Change Password
            </button>
          )}
        </section>

        {/* NOTIFICATIONS */}
        <section className="mb-6">
          <h3 className="font-semibold mb-3">Notifications</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              Monthly summary <Toggle enabled />
            </div>
            <div className="flex justify-between items-center">
              Large transaction alerts <Toggle enabled />
            </div>
            <div className="flex justify-between items-center">
              Product updates <Toggle enabled={false} />
            </div>
          </div>
        </section>

        {/* APPEARANCE */}
        <section className="mb-6">
          <h3 className="font-semibold mb-2">Appearance</h3>
          <p className="text-sm text-gray-400">
            Theme: <b>{darkMode ? "Dark" : "Light"}</b>
          </p>
          <p className="text-sm text-gray-400">
            Currency: <b>INR (₹)</b>
          </p>
        </section>

        {/* LANGUAGE */}
        <section>
          <h3 className="font-semibold mb-2">Language & Region</h3>
          <p className="text-sm text-gray-400">
            Language: <b>English</b>
          </p>
          <p className="text-sm text-gray-400">
            Timezone: <b>Asia/Kolkata</b>
          </p>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
