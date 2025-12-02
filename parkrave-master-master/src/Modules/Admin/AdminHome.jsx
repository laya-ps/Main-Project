import React, { useState } from 'react';
import ManageUsers from './Components/ManageUsers';
import ManagePlotOwners from './Components/ManagePlotOwners';
import MonitorParking from './Components/MonitorParking';
import Reports from './Components/Reports';
import Sidebar from './Components/Sidebar';
import './Admin.css'
import Admindashboard from './Components/Admindashboard';

const AdminHome = () => {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState('admindash');

  // Function to handle the click on a sidebar link
  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  // Render the component based on the active state
  const renderComponent = () => {
    switch (activeComponent) {
      case 'manage-users':
        return <ManageUsers />;
      case 'manage-owners':
        return <ManagePlotOwners />;
      // case 'monitor-parking':
      //   return <MonitorParking />;
      case 'reports':
        return <Reports />;
        case 'reports':
          return <ManageUsers />;
      default:
        return <Admindashboard />;
    }
  };

  return (
    <div className="admin-home">
      <div className="main-content">
        <Sidebar onNavigate={handleNavigation} />
        <div className="page-content">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
