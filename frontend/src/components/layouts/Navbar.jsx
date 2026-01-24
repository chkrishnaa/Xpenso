import React, { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { NAVBAR_HEIGHT } from "../../utils/data";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  // ✅ Close mobile sidebar automatically on desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setOpenSideMenu(false);
      }
    };

    handleResize(); // run once on mount
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div
      className="flex gap-5 bg-gray-100 border-b border-gray-300/50 backdrop-blur-[2px] sticky top-0 z-30"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      {/* Navbar */}
      <div className="flex justify-center items-center gap-5 py-3 px-7 border-r-0 border-gray-300/50 lg:border-r w-0 lg:w-64">
        {/* Hamburger (mobile only) */}
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu((prev) => !prev)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-2xl font-medium text-black hidden lg:block">
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

      {/* Mobile Sidebar */}

      <div>
        <div className="pt-1">
          <p className="text-base font-semibold text-gray-800">
            Welcome to your Dashboard
          </p>
          <p className="text-sm text-gray-300">
            Track your income and expenses easily and stay in control of your
            finances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
