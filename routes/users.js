const express = require('express');
const router = express.Router();
const ParentRegistration = require('../models/ParentRegistration');
const ChildRegistration = require('../models/ChildRegistration');

// Route to fetch both parent and child users
router.get('/', async (req, res) => {
  try {
    const parents = await ParentRegistration.find({}, 'email username createdAt').lean();
    const children = await ChildRegistration.find({}, 'email username createdAt').lean();

    const combinedData = [
      ...parents.map(parent => ({
        id: parent._id,
        email: parent.email,
        username: parent.username,
        type: 'Parent',
      })),
      ...children.map(child => ({
        id: child._id,
        email: child.email,
        username: child.username,
        type: 'Child',
      }))
    ];

    // Log the data to the Node.js terminal
    console.log("Users fetched from database:", combinedData);

    res.json({ users: combinedData });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
