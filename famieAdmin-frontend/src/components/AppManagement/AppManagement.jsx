import React, { useState, useEffect } from 'react';
import './AppManagement.css';

const AppManagement = () => {
  const [blockedApps, setBlockedApps] = useState([]);

  useEffect(() => {
    // Fetch blocked apps where is_allowed is false
    fetch('http://localhost:6192/api/app_management/blocked_apps')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Blocked apps received:", data);
        setBlockedApps(data); // Set the blocked apps data
      })
      .catch(error => console.error('Error fetching blocked apps:', error));
  }, []);

  return (
    <div className="app-management-container">
      <h3 className="blocked-apps-title">Blocked Applications</h3>
      <div className="app-management-list-container">
        {blockedApps.length === 0 ? (
          <p>No blocked applications available</p>
        ) : (
          <ul className="app-management-list">
            {blockedApps.map((app, index) => (
              <li key={index}>
                {index + 1}. {app.app_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppManagement;
