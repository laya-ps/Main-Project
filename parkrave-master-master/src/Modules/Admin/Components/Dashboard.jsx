// src/components/Dashboard.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageUsers from './ManageUsers';
import MonitorParking from './MonitorParking';
import Reports from './Reports';

const Dashboard = () => {
  return (
    <div className="dashboard-content">
        <h2>Welcome! Select an option from the sidebar.</h2>
    </div>
  );
};

export default Dashboard;
