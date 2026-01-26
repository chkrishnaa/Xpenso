import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const Logout = () => {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);

  useEffect(() => {
    // 1️⃣ Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearUser();

    toast.success("Logged out successfully.");

    // 2️⃣ Redirect
    navigate("/login", { replace: true });
  }, []);

  return null;
};

export default Logout;
