import axios from 'axios'
import { act } from 'react';
import Cookies from 'js-cookie';

const useAxios = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, //can send cookies if we add withCredentials true
})

export const JWTAxios = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

JWTAxios.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("accessToken");
        if(!accessToken){
            window.location.href="/logIn";
        }
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`
        }
        return config;
    },
    (error)=>Promise.reject(error)
);

JWTAxios.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalRequest=error.config;

        if(error.response?.status===401 && !originalRequest._retry){
            originalRequest._retry=true;

            try {
                const res=await useAxios.post(
                "/user/newAccessToken",
            );

            const newAccessToken=res.data.accessToken;

            localStorage.setItem("accessToken",newAccessToken);
            originalRequest.headers.Authorization=`Bearer ${newAccessToken}`;
            return JWTAxios(originalRequest);
                
            } catch (error) {
                console.log("token refresh fail");

                localStorage.removeItem("accessToken");
                Cookies.remove("refreshToken");
                window.location.href="/logIn";
                
                
            }

            

            }
        

        return Promise.reject(error);
    }
)


export default useAxios

