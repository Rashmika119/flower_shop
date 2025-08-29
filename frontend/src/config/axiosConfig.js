import axios from "axios";
import { toast } from "react-toastify";

export const useAxios = axios.create({
  baseURL: "https://localhost:5000/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, //can send cookies if we add withCredentials true
});

export const JWTAxios = axios.create({
  baseURL: "https://localhost:5000/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

JWTAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    if (!accessToken && !userId) {
      toast.error("please sign in", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    config.headers.Authorization = `Bearer ${accessToken}`;

    config.headers.userId = userId;

    return config;
  },
  (error) => Promise.reject(error)
);
