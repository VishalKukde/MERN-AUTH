import React from 'react'
import "./style.css";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginScreen = ({setUserInfo}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");  
    const history = useHistory();  


    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const {data} = await axios.post("/user/login", {email, password},
              {
                headers:{
                  "Content-type":"application/json",
                }
            })
            console.log("data",data)
            setErrorMessage("");
            setSuccessMessage("Logged In !");
            localStorage.setItem("user", JSON.stringify(data));
            setUserInfo(JSON.parse(localStorage.getItem("user")));
            history.push("/profile")
        } catch (error) {
            setErrorMessage("Invalid Email or password");
            setSuccessMessage("");
          }
    }

  return (
    <form className="container" onSubmit={handleSubmit}>
    <h1>Login</h1>
    {errorMessage && (
      <span style={{ color: "red", fontWeight: 600, fontSize: 25 }}>
        {errorMessage}
      </span>
    )}
    {successMessage && (
      <span style={{ color: "green", fontWeight: 600, fontSize: 25 }}>
        {successMessage}
      </span>
    )}
    <div className="inputcon">
      <span className="inputtext">Enter Email :</span>{" "}
      <input
        placeholder="email@example.com"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="inputcon">
      <span className="inputtext">Enter Password :</span>{" "}
      <input
        placeholder="***********"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button type="submit">Login</button>
  </form>
  )
}

export default LoginScreen
