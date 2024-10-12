const mongoose = require('mongoose');

const ParentRegistrationSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

const ParentRegistration = mongoose.model('ParentRegistration', ParentRegistrationSchema, 'parent_registration');
module.exports = mongoose.models.ParentRegistration || mongoose.model('ParentRegistration', ParentRegistrationSchema);
