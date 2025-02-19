import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Avatar, Menu as MuiMenu, MenuItem, Divider } from "@mui/material";

const CustomMenu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch username from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      setUsername(user.username); // Set the username from localStorage
    }
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (event) => {
    setIsProfileDropdownOpen(event.currentTarget);
  };

  const handleProfileClose = () => {
    setIsProfileDropdownOpen(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data if stored
    window.location.href = "https://zerodha-frontend-4gwg.onrender.com"; // Redirect to Zerodha official page
  };

  return (
    <div className="menu-container">
      <img
        src="/Media/Images/zerodha.jpeg"
        alt="No Available"
        style={{ width: "90px" }}
      />
      <div className="menus">
        <ul>
          {[{ name: "Dashboard", path: "/" },
            { name: "Orders", path: "/orders" },
            { name: "Holdings", path: "/holdings" },
            { name: "Positions", path: "/positions" },
            { name: "Funds", path: "/funds" },
            { name: "Apps", path: "/apps" }].map((item, index) => (
              <li key={index}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={item.path}
                  onClick={() => handleMenuClick(index)}
                >
                  <p className={selectedMenu === index ? "menu selected" : "menu"}>
                    {item.name}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <Avatar sx={{ bgcolor: "#3f51b5", width: 40, height: 40 }}>
            {username[0]}
          </Avatar> {/* Display first letter of username */}
          <p className="username">{username}</p> {/* Show username */}
        </div>
        <MuiMenu
          anchorEl={isProfileDropdownOpen}
          open={Boolean(isProfileDropdownOpen)}
          onClose={handleProfileClose}
        >
          <MenuItem disabled>{username}</MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MuiMenu>
      </div>
    </div>
  );
};

export default CustomMenu;
