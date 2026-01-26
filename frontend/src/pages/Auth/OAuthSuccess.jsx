import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/UserContext";
import { API_PATHS } from "../../utils/apiPaths";

const OAuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    axiosInstance
      .get(API_PATHS.AUTH.GET_USER_DETAILS)
      .then(({ data }) => {
        updateUser(data.user);
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      });
  }, [params, navigate, updateUser]);

  return null;
};

export default OAuthSuccess;
