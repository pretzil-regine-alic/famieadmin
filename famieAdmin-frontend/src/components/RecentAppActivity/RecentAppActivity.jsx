import React, { useState, useEffect } from 'react';
import './RecentAppActivity.css';

const RecentAppActivity = () => {
  const [recentApps, setRecentApps] = useState([]);
  const [expandedAppId, setExpandedAppId] = useState(null); // To track which app card is expanded

  useEffect(() => {
    const fetchRecentApps = async () => {
      try {
        const response = await fetch('http://localhost:6192/api/app_time_management'); // Ensure the correct URL
        const data = await response.json();
        console.log("Fetched Data: ", data);

        // Parse the data and map time slots
        const parsedData = data.map(app => {
          return {
            app_name: app.app_name,
            time_slots: app.time_slots.map(slot => ({
              start_time: slot.start_time,
              end_time: slot.end_time,
              allowed_time: slot.allowed_time,
            })),
          };
        });

        setRecentApps(parsedData); // Store the parsed data
      } catch (error) {
        console.error('Error fetching recent app activity:', error);
      }
    };

    fetchRecentApps();
  }, []);

  const toggleExpand = (appId) => {
    setExpandedAppId(expandedAppId === appId ? null : appId); // Toggle the expanded card
  };

  return (
    <div className="recent-app-container">
      {recentApps.length > 0 ? (
        <div>
          <div className="app-activity-row">
            {recentApps.map((app, index) => (
              <div key={index} className="app-card" onClick={() => toggleExpand(index)}>
                <p><strong>{app.app_name}</strong></p>

                {/* Floating Expanded Section */}
                {expandedAppId === index && (
                  <div className={`expanded-section show`}>
                    <div className="floating-box">
                      <p><strong>App Name:</strong> {app.app_name}</p>
                      {app.time_slots.map((slot, idx) => (
                        <div key={idx}>
                          <p><strong>Start Time:</strong> {slot.start_time}</p>
                          <p><strong>End Time:</strong> {slot.end_time}</p>
                          <p><strong>Allowed Time (seconds):</strong> {slot.allowed_time}</p>
                        </div>
                      ))}
                      <button className="close-btn" onClick={() => toggleExpand(null)}>Close</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Display "Most App Used" as a title below the app cards */}
          <h3 className="most-used-title">Most App Used</h3>
        </div>
      ) : (
        <p>No recent app activity found</p>
      )}
    </div>
  );
};

export default RecentAppActivity;
