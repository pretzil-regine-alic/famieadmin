const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Theme = mongoose.model('Theme', new mongoose.Schema({
  background_color: String,
  font_style: String,
  app_bar_color: String,
  button_color: String,
  text_color: String
}, { collection: 'theme_management' }));

// API to update the theme
router.put('/usertheme', async (req, res) => {
  const { background_color, font_style, app_bar_color, button_color, text_color } = req.body;

  try {
    const updatedTheme = await Theme.findOneAndUpdate(
      {}, // No admin_id, just update the first (or only) document
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
