import axios from "axios";
import React, { useState, useEffect } from "react";
import "./style.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [redirectTimer, setRedirectTimer] =useState(5)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/user/register",
        { name, email, password },
        config
      );

      console.log(data);
      setErrorMessage("");
      setSuccessMessage("Successfully Registered !");
      localStorage.setItem("user", JSON.stringify(data));
      setEmail("");
      setName("");
      setPassword("");

      const countdown = setInterval(() => {
        setRedirectTimer((prev) => prev - 1);
      }, 1000);

      // Set a timeout to redirect to login page after 5 seconds
      setTimeout(() => {
        clearInterval(countdown); // Clear the interval when redirecting
        history.push("/");
      }, 5000);


    } catch (error) {
      setErrorMessage("User Already Exists!");
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    // Clear the timer interval on component unmount
    return () => {
      clearInterval();
    };
  }, []);

  return (
    <form className="container" onSubmit={handleSubmit}>
      {successMessage && (
          <span style={{ color: "green", fontWeight: 600, fontSize: 25 }}>
          {successMessage}
          <p style={{ color: "grey", fontSize: 18 }}>Redirecting to the login page in {redirectTimer} seconds...</p>
        </span>
      )}
      {!successMessage && (
          <React.Fragment>
          <h1>Register</h1>
          {errorMessage && (
              <span style={{ color: "red", fontWeight: 600, fontSize: 25 }}>
              {errorMessage}
            </span>
          )}
          <div className="inputcon">
        <span className="inputtext">Enter Name :</span>{" "}
        <input
        value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          type="text"
        />
      </div>
      <div className="inputcon">
        <span className="inputtext">Enter Email :</span>{" "}
        <input
        value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          type="email"
        />
      </div>
      <div className="inputcon">
        <span className="inputtext">Enter Password :</span>{" "}
        <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="***********"
        type="password"
        />
      </div>
      <button type="submit">Register</button>
      </React.Fragment>

    )}
    </form>
  );
};

export default RegisterScreen;