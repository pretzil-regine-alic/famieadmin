const express = require('express');
const router = express.Router();
const AppTimeManagement = require('../models/AppTimeManagement'); // Adjust the path to your model

// Route to fetch all app time management data
router.get('/', async (req, res) => {
  try {
    // Fetch the app time management data, sorting by the most recent end_time and limiting to 3 entries
    const recentActivities = await AppTimeManagement.find().sort({ end_time: -1 }).limit(3);
    res.json(recentActivities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
