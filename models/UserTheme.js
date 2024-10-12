const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Theme = mongoose.model('Theme', new mongoose.Schema({
  background_color: String,
  font_style: String,
  app_bar_color: String,
  button_color: String,
  text_color: String,
  admin_id: { type: mongoose.Schema.Types.ObjectId },  // Ensure this is an ObjectId
}, { collection: 'theme_management' }));

// API to update the theme for an admin
router.put('/usertheme', async (req, res) => {
  const { admin_id, background_color, font_style, app_bar_color, button_color, text_color } = req.body;

  // Log the incoming data for debugging
  console.log('Received theme update request:', req.body);

  try {
    if (!admin_id) {
      return res.status(400).json({ success: false, message: 'admin_id is required' });
    }

    const objectIdAdminId = mongoose.Types.ObjectId(admin_id); // Convert to ObjectId

    const updatedTheme = await Theme.findOneAndUpdate(
      { admin_id: objectIdAdminId },
      { background_color, font_style, app_bar_color, button_color, text_color },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, data: updatedTheme });
  } catch (error) {
    console.error('Error updating theme:', error);
    res.status(500).json({ success: false, message: 'Failed to update theme' });
  }
});

module.exports = router;
