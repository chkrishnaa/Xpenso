import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
   const {user, updateUser, clearUser} = useContext(UserContext);

   const navigate = useNavigate();

   useEffect(() => {
     if(user) return;

     let isMounted = true;

     const fetchUserDetails = async() =>{
        try{
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_DETAILS);

            if(isMounted && response.data){
                updateUser(response.data);
            }
        } catch(error){
            console.log("Failed to fetch user details", error);

            if(isMounted){
                clearUser();
                navigate("/login");
            }
        }
     }

     fetchUserDetails();

     return () => {
        isMounted = false;        
     }
   }, [updateUser, clearUser, navigate]);
};