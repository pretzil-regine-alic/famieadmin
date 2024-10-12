const mongoose = require('mongoose');

const ChildRegistrationSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

const ChildRegistration = mongoose.model('ChildRegistration', ChildRegistrationSchema, 'child_registration');
module.exports = mongoose.models.ChildRegistration || mongoose.model('ChildRegistration', ChildRegistrationSchema);
