import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiBrain } from 'react-icons/gi';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <GiBrain className="logo-icon" />
          <span>Interview<span className="logo-accent">IQ</span></span>
        </Link>
        
        <div className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>History</NavLink>
          <Link to="/setup" className="nav-btn">Start Session</Link>
        </div>
      </div>
    </nav>
  );
}