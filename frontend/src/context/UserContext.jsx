import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ persist
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
