import React, { useState, useEffect } from 'react';
import './AppList.css';
import axios from 'axios';

const AppList = () => {
  const [userApps, setUserApps] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:6192/api/all_app_management/all-apps')
      .then(response => {
        console.log("All apps data received in frontend:", response.data);

        const appsData = [];

        response.data.forEach(doc => {
          if (doc.user_apps && Array.isArray(doc.user_apps)) {
            console.log("User apps found in document:", doc.user_apps);
            appsData.push(...doc.user_apps);
          } else {
            console.log("No user apps found in this document:", doc);
          }
        });

        if (appsData.length > 0) {
          setUserApps(appsData);
        } else {
          setUserApps([]);
        }
      })
      .catch(error => {
        console.error('Error fetching user apps:', error);
        setUserApps([]);
      });
  }, []);

  return (
    <div className="right-panel">
      <h3 className="all-apps-title">List of Apps Used</h3>
      <div className="app-list-container">
        {userApps.length === 0 ? (
          <p>No user apps found</p>
        ) : (
          <ul className="app-list">
            {userApps.map((app, index) => (
              <li key={index}>
                {app.appName}  {/* Display app name */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppList;
