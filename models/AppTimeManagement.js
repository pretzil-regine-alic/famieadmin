const mongoose = require('mongoose');

const appTimeManagementSchema = new mongoose.Schema({
  app_name: { type: String, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  child_id: { type: mongoose.Schema.Types.ObjectId, required: true },
}, { collection: 'app_time_management' });

module.exports = mongoose.model('AppTimeManagement', appTimeManagementSchema);
