import React, { useEffect, useState, useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { NAVBAR_HEIGHT } from "../../utils/data";
import { useTheme } from "../../context/ThemeContext";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

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
      className={`flex gap-5 border-b sticky top-0 z-30 ${
        darkMode
          ? "bg-gray-900 border-gray-700"
          : "bg-gray-100 border-gray-300/50"
      }`}
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      {/* LEFT */}
      <div
        className={`flex items-center gap-5 py-3 px-7 lg:w-64 border-r  ${
          darkMode
            ? "border-gray-700"
            : "border-gray-300/50"
        }`}
      >
        <button
          className={`block lg:hidden ${
            darkMode ? "text-white" : "text-black"
          }`}
          onClick={() => setOpenSideMenu((p) => !p)}
        >
          {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        <h2 className={`${darkMode ? "text-white" : "text-black"} text-2xl`}>
          Xpenso
        </h2>

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
      <div className="flex-1 flex items-center justify-between px-4">
        <div>
          <p className={darkMode ? "text-gray-200" : "text-gray-800"}>
            Welcome to your Dashboard
          </p>
          <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
            Track your income and expenses easily.
          </p>
        </div>

        <div className="flex items-center gap-4">
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
