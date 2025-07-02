import React from 'react'

function LogIn() {
    const[password,setPassword]=useState('');
    const[email,setEmail]=useState('');
     
        const handlePasswordChange=(event)=>{
            setPassword(event.target.value);
        };
        
        
        const handleEmailChange=(event)=>{
            setEmail(event.target.value);
        };
        
        
    
  return (
   
    <div>
    <h2>LogIn</h2>
    <div>
        <p>Welcome back to Flower & Bloom</p>
        <div>
        <input placeholder="Enter your Email" type='email' value={email} onChange={handleEmailChange}/>
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