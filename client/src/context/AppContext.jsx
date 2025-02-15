import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = "http://127.0.0.1:5000";
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [UserData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/user/data", {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    UserData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
