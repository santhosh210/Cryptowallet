// Navbar.tsx
import React from "react";
import "./Navbar.css";
import logo from "../logo.png";
import avatar from "../pc header.svg";
interface NavbarProps {
  logos: string;
  email: string;
  avatars: string;
}

const Navbar: React.FC<NavbarProps> = ({ logos, email, avatars }) => {
  return (
    <div className="navbar">
      <div className="left-nav">
        <img src={logo} alt="Logo" className="logo" />
        <div className="nav-link">Trade</div>
        <div className="nav-link">Landing</div>
        <div className="nav-link">Exchange</div>
      </div>
      <div className="right-nav">
        <div className="nav-link">Funds</div>
        <div className="nav-link">History</div>
        <div className="avatar">
          <img src={avatar} alt="Avatar" />
          <span>{email}</span>
          <div className="nav-link">ab***@atomsolution...</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
