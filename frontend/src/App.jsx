import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, logedIn, logedOut } from "./state/user/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useAxios } from "./config/axiosConfig";
import Navigation from "./components/navigation/Navigation";

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently, logout } =
    useAuth0();
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.user.isLogedIn);
  const [loading, setLoading] = useState(false);

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

      if (responce.status == 200 || responce.status == 201) {
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
        localStorage.removeItem("userId");
        localStorage.removeItem("accessToken");
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
        dispatch(logedOut());
        setTimeout(async () => {
          await logout();
        }, 1000);
      }
    } catch (error) {
      console.error("User signed In error:", error);
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
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
      dispatch(logedOut());
      setTimeout(async () => {
        await logout();
      }, 1000);
    }
  };

  useEffect(() => {
    const fetchAuthStatus = async () => {
      if (isLoading) {
        setLoading(true);
        return;
      }

      if (!isAuthenticated) {
        localStorage.removeItem("userId");
        localStorage.removeItem("accessToken");
        dispatch(logedOut());
        setLoading(false);
        return;
      }

      await handlelogin();
      setLoading(false);
    };

    fetchAuthStatus();
  }, [isAuthenticated, isLoading]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-500">
          <div className="w-16 h-16 relative">
            <div
              className="absolute top-0 left-1/2 w-3 h-3 bg-primary rounded-full animate-ping"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="absolute top-2 right-2 w-3 h-3 bg-secondary rounded-full animate-ping"
              style={{ animationDelay: "200ms" }}
            ></div>
            <div
              className="absolute bottom-2 right-2 w-3 h-3 bg-primary rounded-full animate-ping"
              style={{ animationDelay: "400ms" }}
            ></div>
            <div
              className="absolute bottom-0 left-1/2 w-3 h-3 bg-secondary rounded-full animate-ping"
              style={{ animationDelay: "600ms" }}
            ></div>
            <div
              className="absolute bottom-2 left-2 w-3 h-3 bg-primary rounded-full animate-ping"
              style={{ animationDelay: "800ms" }}
            ></div>
            <div
              className="absolute top-2 left-2 w-3 h-3 bg-secondary rounded-full animate-ping"
              style={{ animationDelay: "1000ms" }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl">🌸</span>
            </div>
          </div>
        </div>
      )}

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
