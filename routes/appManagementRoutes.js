// appManagementRoutes.js
const express = require('express');
const router = express.Router();
const AppManagement = require('../models/AppManagement');

// Fetch only blocked apps from user_apps in app_management collection
router.get('/blocked_apps', async (req, res) => {
  try {
    const blockedApps = await AppManagement.find({ 'user_apps.is_allowed': false });
    
    const apps = [];
    
    // Extract blocked user apps
    blockedApps.forEach(app => {
      app.user_apps.forEach(userApp => {
        if (userApp.is_allowed === false) {
          apps.push(userApp);
        }
      });
    });

    res.json(apps); // Send the filtered blocked apps
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blocked apps' });
  }
});

module.exports = router;
