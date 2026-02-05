import React, { forwardRef, useContext } from "react";
import { SIDE_MENU_DATA, NAVBAR_HEIGHT } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import { MdVerified } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";
import { LuLogOut } from "react-icons/lu";

const SideMenu = forwardRef(({ activeMenu }, ref) => {
  const { user, clearUser } = useContext(UserContext);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleClick = (route) => {
    if (route === "Logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
      return;
    }
    navigate(route);
  };

  return (
    <aside
      ref={ref}
      className={`w-56 mob:w-64 border-r p-5 z-40 sticky flex flex-col
    ${
      darkMode
        ? "bg-gray-900 border-gray-700"
        : "bg-gray-100 border-gray-300/50"
    }
  `}
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      {/* USER SECTION */}
      <div className="flex flex-col items-center gap-2 mt-3 mb-6 min-h-[140px]">
        {user ? (
          <>
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

              {user.isAccountVerified && (
                <MdVerified
                  size={20}
                  className="absolute bottom-0 right-0 text-income"
                />
              )}
            </div>

            <h5
              className={`font-medium ${
                darkMode ? "text-gray-200" : "text-gray-950"
              }`}
            >
              {user.fullName}
            </h5>
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
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* MENU */}
        <div className="flex flex-col flex-1">
          {SIDE_MENU_DATA.map((item, index) => {
            const isActive = currentPath === item.path;
            const isHome = item.label === "Home";

            return (
              <button
                key={index}
                onClick={() => handleClick(item.path)}
                className={`w-full flex items-center gap-4 py-2 px-4 rounded-lg mob:rounded-xl mb-2 transition-all duration-300
            ${
              isHome
                ? `bg-gradient-to-r from-green-500 via-blue-600 to-indigo-600
     text-white font-medium
     shadow-lg shadow-blue-500/30
     hover:shadow-blue-500/50
     hover:from-green-600 hover:to-indigo-700
     hover:scale-[1.02]
     transition-all duration-300 group`
                : isActive
                ? `bg-gradient-to-r from-balance via-blue-600 to-indigo-600
     text-white font-medium
     shadow-md shadow-blue-500/30
     hover:shadow-blue-500/40
     hover:scale-[1.01]
     transition-all duration-300`
                : darkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-200"
            }
          `}
              >
                <item.icon className="text-xl" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* LOGOUT – STICKS TO BOTTOM */}
        <div className="mt-auto px-2 pb-4">
          <button
            onClick={() => handleClick("/logout")}
            className={`w-full flex items-center gap-4 py-3 px-4 rounded-lg mob:rounded-xl font-medium
        transition-all duration-300 group
        ${
          darkMode
            ? "bg-gradient-to-r from-red-600/70 to-pink-600/70 text-white hover:from-red-600 hover:to-pink-600 shadow-lg shadow-red-500/20"
            : "bg-gradient-to-r from-red-100 to-pink-100 text-red-600 hover:from-red-200 hover:to-pink-200 shadow-md"
        }
      `}
          >
            <LuLogOut className="text-xl transition-transform duration-300 group-hover:rotate-12" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
});

export default SideMenu;
