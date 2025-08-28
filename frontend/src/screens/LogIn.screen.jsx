import axios from 'axios';
import React, { useState } from 'react'
import useAxios from '../config/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

function LogIn() {
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');

    const navigate = useNavigate();
     
        const handlePasswordChange=(event)=>{
            setPassword(event.target.value);
        };
        
        
        const handleEmailChange=(event)=>{
            setEmail(event.target.value);
        };
        
        const handleLogIn=async()=>{
            if(password && email){
                try {
                    const response=await useAxios.post("/user/loginUser",{
                      email,password});

                      if(response.status==200){
                        const accessToken=response.data.accessToken;
                        localStorage.setItem("accessToken",accessToken);
                      }

                  alert(response.data.message);  
                  navigate("/")
                } catch (error) {
                    console.log(error.message)
                    alert("Login failed")
                }
            }
            else{
                alert("Please enter username and password");
            }
        }

        const handleGoogleLogin=()=>{
          window.location.href="http://localhost:3000/api/user/googleLogIn"
        }
        
    
return (
  <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white">
    {/* Background decorative elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-20 text-6xl opacity-10 animate-pulse delay-1000">🌸</div>
      <div className="absolute top-32 right-16 text-4xl opacity-20 animate-bounce delay-500">🌸</div>
      <div className="absolute bottom-40 left-16 text-3xl opacity-20 animate-bounce delay-1000">🌸</div>
      <div className="absolute bottom-20 right-24 text-5xl opacity-10 animate-pulse delay-1500">🌸</div>
    </div>

    <div className="relative flex justify-center items-center min-h-screen px-4 py-8">
      <div className="w-full max-w-md">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-rose-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative bg-gradient-to-br from-white/80 via-white/70 to-rose-50/30 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20">
            
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              LogIn
            </h2>
            
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 font-medium">Welcome back to Flower & Bloom</p>
              <div className="flex justify-center mt-4">
                <div className="w-16 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="relative">
                <input 
                  placeholder="Enter your Email" 
                  type="text" 
                  value={email} 
                  onChange={handleEmailChange}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                />
              </div>
              
              <div className="relative">
                <input 
                  placeholder="Enter your Password" 
                  type="password" 
                  value={password} 
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-rose-200/50 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all duration-300 hover:bg-white/80"
                />
              </div>
            </div>
            <div>
              <button 
              onClick={handleGoogleLogin}
              >
                Google LogIn
              </button>
            </div>
            
            <div className="mt-8">
              <button 
                onClick={handleLogIn}
                className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95"
              >
                LogIn
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-2">Don't you have an account?</p>
              <Link 
                to="/signUp"
                className="inline-block bg-white/50 hover:bg-white/80 border-2 border-rose-300 text-gray-700 px-6 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 backdrop-blur-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default LogIn