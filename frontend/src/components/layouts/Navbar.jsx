import React, { useEffect, useState, useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { NAVBAR_HEIGHT } from "../../utils/data";
import { useTheme } from "../../context/ThemeContext";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { LuWalletMinimal } from "react-icons/lu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const { darkMode } = useTheme();
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const isLoggedIn = !!user; // ✅ session check
  const isAccountVerified = user?.isAccountVerified === true; // ✅ verification check

  // Close mobile sidebar on desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setOpenSideMenu(false);
      }
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div
      className={`flex gap-5 border-b sticky top-0 z-30 backdrop-blur-md ${
        darkMode
          ? "bg-gray-950/90 border-gray-700"
          : "bg-gray-100/80 border-gray-300/50"
      }`}
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      {/* LEFT */}
      <div
        className={`flex items-center justify-center gap-5 py-3 px-3 sm:px-7 lg:w-64 sm:border-r-0 lg:border-r  ${
          darkMode ? "border-gray-700" : "border-gray-300/50"
        }`}
      >
        <button
          className={`block lg:hidden ${
            darkMode ? "text-white" : "text-black"
          }`}
          onClick={() => setOpenSideMenu((p) => !p)}
        >
          {openSideMenu ? (
            <HiOutlineX className="h-5 mob:h-6 w-5 mob:w-6" />
          ) : (
            <HiOutlineMenu className="h-5 mob:h-6 w-5 mob:w-6" />
          )}
        </button>

        <button
          onClick={() => navigate("/")}
          className="hidden sm:flex items-center gap-3 sm:block"
        >
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-sm ${
              darkMode
                ? "bg-gradient-to-br from-green-500 to-blue-500"
                : "bg-gradient-to-br from-green-400 to-blue-400"
            }`}
          >
            <LuWalletMinimal className="w-5 h-5 text-white" />
          </div>

          <span
            className={`text-3xl font-semibold tracking-tight ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Xpenso
          </span>
        </button>

        {openSideMenu && (
          <div
            className="fixed left-0 z-40 lg:hidden"
            style={{ top: `${NAVBAR_HEIGHT}px` }}
          >
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-between">
        <div className="hidden lg:block">
          <p
            className={`font-bold ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Welcome to your Dashboard
          </p>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Track your income and expenses easily.
          </p>
        </div>

        <div></div>

        <div className="flex items-center gap-4 pr-3 sm:pr-5">
          {isLoggedIn ? (
            <ProfileDropdown
              isOpen={openProfile}
              onToggle={() => setOpenProfile((p) => !p)}
              avatar={user?.profileImageUrl}
              email={user?.email}
              isAccountVerified={isAccountVerified}
              onLogout={() => {
                clearUser();
                navigate("/login");
              }}
            />
          ) : (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
