import React, { useEffect, useState } from "react";
import "./style.css";
import {useHistory}  from "react-router-dom";

const Profile = ({  }) => {
  const [userInfo, setUserInfo] = useState("");
  const history = useHistory();  

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("user")));
  }, [userInfo]);

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo("");
    history.push("/");
  };

  return (
    <div className="container">
      <h1>My Profile</h1>
      <div className="inputcon">
        <span className="inputtext">Name :</span>
        <span>{userInfo && userInfo.name}</span>
      </div>
      <div className="inputcon">
        <span className="inputtext">Email :</span>{" "}
        <span>{userInfo && userInfo.email}</span>
      </div>
    </div>
  );
};

export default Profile;