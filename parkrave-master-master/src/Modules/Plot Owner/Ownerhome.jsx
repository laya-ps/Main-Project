import React, { useState } from 'react';
import './Ownerhome.css'
import PlotOwnerSB from './components1/PlotOwnerSB';
import Manageplots from './components1/Manageplots';

import Earningsrepots from './components1/Earningsrepots';
import Ownerdashboard from './components1/Ownerdashboard';

const Ownerhome = () => {
  const [activeComponent, setActiveComponent] = useState('ownerdash');

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {

      case 'earningsreports':
        return <Earningsrepots />;
        case 'manageplots':
          return <Manageplots />;
          default:
        return <Ownerdashboard />;
    }
  };

  return (
    <div className="Owner-home">
      <div className="main-content">
        <PlotOwnerSB onNavigate={handleNavigation} />
        <div className="page-content">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Ownerhome