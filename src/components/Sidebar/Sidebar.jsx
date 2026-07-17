import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiSliders, FiActivity, FiClock, FiPlusCircle } from 'react-icons/fi';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}
        >
          <FiActivity className="sidebar-icon" />
          <span>Overview</span>
        </NavLink>

        <NavLink 
          to="/setup" 
          className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}
        >
          <FiPlusCircle className="sidebar-icon" />
          <span>New Session</span>
        </NavLink>

        <NavLink 
          to="/history" 
          className={({ isActive }) => isActive ? "sidebar-item active" : "sidebar-item"}
        >
          <FiClock className="sidebar-icon" />
          <span>Past Logs</span>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <div className="engine-status">
          <div className="status-indicator online"></div>
          <span>Gemini AI Engine Active</span>
        </div>
      </div>
    </aside>
  );
}