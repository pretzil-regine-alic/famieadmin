const mongoose = require('mongoose');

const UserAppSchema = new mongoose.Schema({
  appName: { type: String, required: true },
  packageName: { type: String, required: true },
  isSystemApp: { type: Boolean, required: true }
});

const AppListSchema = new mongoose.Schema({
  child_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  system_apps: { type: Array },
  user_apps: [UserAppSchema]  // Array of embedded documents
}, { collection: 'app_list' });  // Specify the collection name explicitly

module.exports = mongoose.model('AppList', AppListSchema);
