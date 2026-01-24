import React, { useContext } from "react";
import { SIDE_MENU_DATA, NAVBAR_HEIGHT } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

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
      className="w-64 bg-gray-100 border-r border-gray-300/50 p-5 sticky z-20"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      {/* USER SECTION */}
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-6 min-h-[140px]">
        {user ? (
          <>
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

            <h5 className="text-gray-950 font-medium leading-6">
              {user.fullName}
            </h5>
          </>
        ) : (
          /* Skeleton (important) */
          <>
            <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse" />
            <div className="w-24 h-4 bg-gray-300 rounded animate-pulse" />
          </>
        )}
      </div>

      {/* MENU ITEMS */}
      <div className="flex flex-col">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-2 transition
              ${
                activeMenu === item.path
                  ? "text-white bg-primary"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default SideMenu;
