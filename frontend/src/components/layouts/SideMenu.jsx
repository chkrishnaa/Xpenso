import React, { useContext } from "react";
import { SIDE_MENU_DATA, NAVBAR_HEIGHT } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { MdVerified } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleClick = (route) => {
    if (route === "Logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <aside
      className={`w-64 border-r p-5 sticky z-20 ${
        darkMode
          ? "bg-gray-900 border-gray-700"
          : "bg-gray-100 border-gray-300/50"
      }`}
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      {/* USER SECTION */}
      <div className="relative flex flex-col items-center justify-center gap-2 mt-3 mb-6 min-h-[140px]">
        {user ? (
          <>
            {/* Avatar wrapper */}
            <div className="relative">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <CharAvatar
                  fullName={user.fullName || "User"}
                  width="w-20"
                  height="h-20"
                  style="text-xl"
                />
              )}

              {/* Verified badge */}
              {user.isAccountVerified && (
                <MdVerified
                  size={20}
                  className="absolute bottom-0 right-0 rounded-full text-income bg-transparent"
                />
              )}
            </div>

            <h5
              className={`font-medium leading-6 ${
                darkMode ? "text-gray-200" : "text-gray-950"
              }`}
            >
              {user.fullName}
            </h5>

            {/* Verify Email Button */}
            {!user.isAccountVerified && (
              <button
                onClick={() => navigate("/verify-email")}
                className={`text-xs px-3 py-1 rounded-full transition ${
                  darkMode
                    ? "bg-yellow-900/40 text-yellow-300 hover:bg-yellow-900/60"
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                }`}
              >
                Verify your email
              </button>
            )}
          </>
        ) : (
          <>
            <div
              className={`w-20 h-20 rounded-full animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
            <div
              className={`w-24 h-4 rounded animate-pulse ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            />
          </>
        )}
      </div>

      {/* MENU ITEMS */}

      <div className="flex flex-col">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = currentPath === item.path;
          const isHome = item.label === "Home";

          return (
            <button
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-2 transition
          ${
            isHome
              ? "sm:hidden bg-gradient-to-r from-green-500 to-blue-500 text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600"
              : isActive
              ? "bg-balance text-white"
              : darkMode
              ? "text-gray-300 hover:bg-gray-800"
              : "text-gray-700 hover:bg-gray-200"
          }
        `}
              onClick={() => handleClick(item.path)}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="text-xl" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default SideMenu;
