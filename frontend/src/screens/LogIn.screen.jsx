import axios from 'axios';
import React, { useState } from 'react'

function LogIn() {
    const[password,setPassword]=useState('');
    const[username,setUsername]=useState('');
     
        const handlePasswordChange=(event)=>{
            setPassword(event.target.value);
        };
        
        
        const handleUsernameChange=(event)=>{
            setUsername(event.target.value);
        };
        
        const handleLogIn=async()=>{
            if(password && username){
                try {
                    const response=await axios.post("/api/user/loginUser",{username,password});
                  alert(response.data.message);  
                } catch (error) {
                    alert(error.response.data.message || "Login failed")
                }
            }
            else{
                alert("Please enter username and password");
            }
        }
        
    
  return (
   
    <div>
    <h2>LogIn</h2>
    <div>
        <p>Welcome back to Flower & Bloom</p>
        <div>
        <input placeholder="Enter your Username" type='text' value={username} onChange={handleUsernameChange}/>
        <input placeholder="Enter your Password" type='password' value={password} onChange={handlePasswordChange}/>
        </div>
        <div>
            <button onClick={handleLogIn}>LogIn</button>
        </div>


    </div>
    </div>
  )
}

export default LogIn