import React, { useState, useEffect } from "react";
import firebaseAuth from "../config/firebase";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message,setMessage] = useState("");

  let handleOnClick = async () => {
    try {
      let response = await firebaseAuth.signInWithEmailAndPassword(
        userName,
        password
      );
      setUser(response.user.uid);
      //   console.log(response.user.uid);
    } catch (err) {
      setMessage(err.message);
      //  setMessage(err);
    }
  };

  useEffect(()=>{
      firebaseAuth.onAuthStateChanged((data)=>{
        //   console.log("In auth state changed");
        if(data){ //data not equal to null
            console.log(data);
            setUser(data.uid);
        }
      });
  },[])

  let handleLogout = async()=>{
      await firebaseAuth.signOut();
      setUser(null);
  }
  return user ? (
    <div>
      <h1>Welcome to home page user id is {user}</h1>
      <button onClick ={handleLogout}>Logout</button>
    </div>
  ) : (
    <div>
      <h1>FireBase Login</h1>
      <div className="username">
        UserName
        <input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>
      <div className="password">
        Password{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button onClick={handleOnClick}>Login</button>
      <h2 style ={{color : "red"}}>{message}</h2>
    </div>
  );
};

export default Login;
