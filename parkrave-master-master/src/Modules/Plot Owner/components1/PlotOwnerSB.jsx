import React from 'react';
import './PlotOwnerSidebar.css'
import { useNavigate } from 'react-router-dom';


const PlotOwnerSB = ({ onNavigate }) => {
    const navigation = useNavigate()
  return (
    <div className="posidebar">
      <h2>Plot Owner Dashboard</h2>
      <ul>
        <li onClick={() => onNavigate('ownerdash')}>Dashboard</li>
        <li onClick={() => onNavigate('manageplots')}>Manage Plots</li>
        <li onClick={() => onNavigate('earningsreports')}>EarningsReports</li>
        <li onClick={() => navigation('/')}>Logout</li>
      </ul>
    </div>
  );
};

export default PlotOwnerSB;
