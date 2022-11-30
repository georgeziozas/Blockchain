import React from "react";
import logo from "./airbnb_logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} className="navbar--logo" alt="Airbnb logo" />
    </nav>
  );
}
