const express = require('express');
const router = express.Router();
const AppList = require('../models/AppList');

// Route to get all apps
router.get('/all-apps', async (req, res) => {
    try {
        const apps = await AppList.find({});  // Fetch all documents
        console.log("Apps fetched from MongoDB:", JSON.stringify(apps, null, 2));  // Log fetched data

        if (apps.length === 0) {
            console.log("No apps found in MongoDB collection.");
            return res.status(404).json({ message: 'No apps found' });
        }

        res.json(apps);  // Send the data to the frontend
    } catch (err) {
        console.error("Error fetching apps:", err);
        res.status(500).json({ error: 'Failed to fetch apps' });
    }
});

module.exports = router;
