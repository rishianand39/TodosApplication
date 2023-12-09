import React, { useState } from "react";
import "../styles/scss/navbar.scss";
import { NavLink } from "react-router-dom";
import Search from "../building-block/search";
import { useSelector } from "react-redux";
import Avatar from "../building-block/avatar";
const Navbar = () => {
  // eslint-disable-next-line
  const currentUser = useSelector((state) => state.user?.currentUser);

  return (
    <div className="navbar">
      <div className="logo">
        <NavLink to="/" className="link">
          <span>Task Manager</span>
        </NavLink>
      </div>
      {currentUser && <Search placeholder="Search task..." />}
      <div className="auth">
        {currentUser ? (
          <div className="profileContainer">
            <Avatar size="35px" name ={currentUser?.user?.name}/>
            <span>Profile</span>
            </div>
        ) : (
          <NavLink to="/auth" className="link">
            <button>Login</button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
