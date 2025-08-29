import React, { useEffect } from "react";
import Navigation from "./navigation/Navigation";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, logedIn, logedOut } from "./state/user/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useAxios } from "./config/axiosConfig";

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.user.isLogedIn);

  const handlelogin = async () => {
    try {
      const token = await getAccessTokenSilently();

      const userInfo = await axios.get(
        "https://dev-0b3jh700mwszqd4e.us.auth0.com/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userdata = userInfo.data;

      const responce = await useAxios.post(
        "/auth/login",
        {
          email: userdata.email,
          name: userdata.name,
          picture: userdata.picture,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (responce.status == 200) {
        toast.success("User login successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        localStorage.setItem("userId", responce.data.id);
        localStorage.setItem("accessToken", token);
        dispatch(logedIn());
        dispatch(addUserData(responce.data.user));
      } else {
        toast.error("User login fail", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("User signed In error:", error);
      toast.error("Error login user", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      if (!isAuthenticated && isLoading) {
        localStorage.removeItem("userId");
        localStorage.removeItem("accessToken");
        dispatch(logedOut());
      } else {
        handlelogin();
      }
    };

    fetchAuthStatus();
  }, [isAuthenticated]);

  return (
    <>
      <Navigation />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
