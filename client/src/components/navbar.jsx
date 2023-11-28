import React, { useState } from "react";
import "../styles/scss/navbar.scss";
import { NavLink } from "react-router-dom";
import Search from "../building-block/search";
import { useSelector } from "react-redux";


const Navbar = () => {
// eslint-disable-next-line
const user = useSelector((state) => state.user);


  return (
    <div className="navbar">
      <div className="logo">
        <NavLink to="/" className="link">
        <span>Task Manager</span>
        </NavLink>
      </div>
      <Search placeholder="Search task..."/>
      {user?.isLoggedIn ? (
        <div>
          <button>Logout</button>
        <div className="profile"></div>
        </div>
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
