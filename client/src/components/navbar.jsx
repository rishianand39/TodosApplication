import React, { useState } from "react";
import "../styles/scss/navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from "react-router-dom";


const Navbar = () => {
  // const navigate 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="navbar">
      <div className="logo">
        <span>Task Manager</span>
      </div>
      <div className="search">
      <SearchIcon />
        <input type="search" placeholder="search task..."/>
      </div>
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
