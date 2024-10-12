const mongoose = require('mongoose');

const appManagementSchema = new mongoose.Schema({
  child_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  parent_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_apps: [
    {
      app_name: { type: String, required: true },
      package_name: { type: String, required: true },
      isSystemApp: { type: Boolean, required: true },
      is_allowed: { type: Boolean, required: true }
    }
  ],
  system_apps: [
    {
      app_name: { type: String },
      package_name: { type: String },
      isSystemApp: { type: Boolean },
      is_allowed: { type: Boolean }
    }
  ]
}, { collection: 'app_management' });

module.exports = mongoose.model('AppManagement', appManagementSchema);
