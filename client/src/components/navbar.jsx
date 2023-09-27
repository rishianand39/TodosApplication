import React, { useState } from "react";
import "../styles/scss/navbar.scss";
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
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
          <button>Login</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
