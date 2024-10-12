const express = require('express');
const router = express.Router();
const AppManagement = require('../models/AppManagement');

router.get('/your-endpoint', async (req, res) => {
  try {
    const apps = await AppManagement.find();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
