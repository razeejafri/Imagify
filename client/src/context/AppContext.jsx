import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // used to see wheather a user is login or not
  const [user, setuser] = useState(null);
  const [showLogin, setshowLogin] = useState(false);
  const [token, settoken] = useState(localStorage.getItem("token"));

  const [credit, setcredit] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate()

  const loadCreditsdata = async () => {
    try {
      // headers in postman where we add token to get user name here we also get the credits
      const { data } = await axios.get(backendUrl + "/api/user/credits", {headers: { token }});

      if (data.success) {
        setcredit(data?.credits);
        setuser(data?.user);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image", { prompt }, { headers: { token } });

      if (data.success) {
        loadCreditsdata();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditsdata();
        if (data.creditBalance === 0) {
          navigate('/buy');
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    setuser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreditsdata();
    }
  }, [token]);

  const value = {
    user,
    setuser,
    showLogin,
    setshowLogin,
    token,
    settoken,
    credit,
    setcredit,
    backendUrl,
    logout,
    loadCreditsdata,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
