// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ onNavigate }) => {
    const navigation = useNavigate()
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li onClick={() => onNavigate('admindash')}>Dashboard</li>
        <li onClick={() => onNavigate('manage-users')}>Manage Users</li>
        <li onClick={() => onNavigate('manage-owners')}>Manage Owners</li>
        {/* <li onClick={() => onNavigate('monitor-parking')}>Monitor Parking</li> */}
        <li onClick={() => onNavigate('reports')}>Reports</li>
        <li onClick={() => navigation('/')}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
