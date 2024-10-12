const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importing CORS
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Configure CORS - allowing requests from your frontend URL
app.use(cors({
  origin: 'http://localhost:3000' // Change this to your frontend URL if different
}));

app.use(bodyParser.json());
app.use(express.json());

// Log MongoDB URI for debugging (ensure this is removed in production)
console.log('MongoDB URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Import Mongoose models
const AppManagement = require('./models/AppManagement');  // Your app management model
const AllappManagement = require('./models/AppList');     // Your app list model
const AppTimeManagement = require('./models/AppTimeManagement');  // App time management model

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const usersRoutes = require('./routes/users');  // For active users
const userthemeRoutes = require('./routes/userthemeRoutes');
const appManagementRoutes = require('./routes/appManagementRoutes');
const appTimeManagementRoutes = require('./routes/app_time_management');
const allAppManagementRoutes = require('./routes/AppListroutes');  // Added AppList routes

// Use Routes
app.use('/api/admin', adminRoutes);   // Route for login and registration
app.use('/api/users', usersRoutes);  // Route for active users
app.use('/api', userthemeRoutes);  // Theme routes
app.use('/api/app_management', appManagementRoutes);  // App management routes
app.use('/api/app_time_management', appTimeManagementRoutes);  // App time management routes
app.use('/api/all_app_management', allAppManagementRoutes);  // All apps management routes

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch all other routes and return the index.html file from 'build' for a single-page app (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Example API route - adjust this as necessary
app.get('/api/someRoute', (req, res) => {
  res.json({ message: "Some route working!" });
});

// Start the server
const port = process.env.PORT || 5252;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
