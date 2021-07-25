import React, { useState, useEffect } from 'react';
const Login = () => {
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    return (
        <div>
            <h1>FireBase Login</h1>
            <div className="username">
                UserName<input type="text" value = {userName} onChange = {(e)=>{ setUserName(e.target.value)}}/>
            </div>
            <div className="password">
                Password <input type="password" value = {password} onChange = {(e)=>{ setPassword(e.target.value)}}/>
            </div>
        </div>
      );
}
 
export default Login;
<div>

</div>