const mongoose = require('mongoose');

const adminRegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { 
  collection: 'admin_registration', // Explicitly set collection name
  versionKey: false  // Disable the __v field
});

const AdminRegistration = mongoose.models.AdminRegistration || mongoose.model('AdminRegistration', adminRegistrationSchema);

module.exports = AdminRegistration;
