import React, { useContext, useState } from "react";
import { ThemeContext } from "../App";

const Profile = () => {
  const theme = useContext(ThemeContext);

  const style = {
    backgroundColor: theme ? "lightgray" : "black",
    color: theme ? "black" : "white",
    padding: "2rem",
    margin: "2rem",
  };
  return <h1 style={style}>Profile</h1>;
};

export default Profile;
