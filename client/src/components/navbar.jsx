import React, { useState } from "react";
import "../styles/scss/navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Search from "../building-block/search";
import { useSelector } from "react-redux";
import Avatar from "../building-block/avatar";
const Navbar = () => {
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user?.info);

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
          <div onClick={()=>navigate("/profile")} className="profileContainer">
            <Avatar size="35px" name ={currentUser?.name}/>
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
