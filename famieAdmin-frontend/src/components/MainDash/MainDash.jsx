import React from 'react';
import AppManagement from '../AppManagement/AppManagement';
import RecentAppActivity from '../RecentAppActivity/RecentAppActivity';
import AppList from '../AppList/AppList'; // Import the AppList component
import './MainDash.css';

const MainDash = () => {
  return (
    <div className="MainDash-container">
      {/* Left Panel */}
      <div className="left-panel">
        <h1 className="theme-title">Dashboard</h1>
        <RecentAppActivity />
        <AppManagement />
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <AppList /> {/* Add AppList component to the right panel */}
      </div>
    </div>
  );
};

export default MainDash;
