import React, { useState } from "react";
import "../styles/scss/navbar.scss";
import { NavLink } from "react-router-dom";
import Search from "../building-block/search";


const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="navbar">
      <div className="logo">
        <NavLink to="/" className="link">
        <span>Task Manager</span>
        </NavLink>
      </div>
      <Search placeholder="Search task..."/>
      {isLoggedIn ? (
        <div className="profile"></div>
      ) : (
        <div className="auth">
          <NavLink to="/auth" className="link">

           <button>Login</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
