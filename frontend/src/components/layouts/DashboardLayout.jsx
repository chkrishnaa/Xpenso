import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useTheme } from "../../context/ThemeContext";
// import FloatingChatBot from "./AiChatBot/FloatingChatBot";

const DashboardLayout = ({ children, activeMenu }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`min-h-screen`}>
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <SideMenu activeMenu={activeMenu} />
        </div>
        {/* Main Content */}
        <div
          className={`grow transition-all duration-500 bg-gradient-to-br ${
            darkMode
              ? "from-blue-950 via-gray-950 to-blue-950"
              : "from-blue-100 via-gray-50 to-blue-100"
          }
          `}
        >
          <div className="mx-0 mob:mx-3 sm:mx-5">{children}</div>
        </div>{" "}
        {/* <FloatingChatBot /> */}
      </div>
    </div>
  );
};

export default DashboardLayout;
