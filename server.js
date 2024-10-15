const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importing cors
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Configure CORS - allowing requests from your frontend URL
const corsOptions = {
  origin: ['https://adminfrontend-b5aa85f07c03.herokuapp.com'], // Add your frontend's Heroku URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));


// Parse incoming requests
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
const AppManagement = require('./models/AppManagement');
const AllappManagement = require('./models/AppList');
const AppTimeManagement = require('./models/AppTimeManagement');

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const usersRoutes = require('./routes/users'); // For active users
const userthemeRoutes = require('./routes/userthemeRoutes');
const appManagementRoutes = require('./routes/appManagementRoutes');
const appTimeManagementRoutes = require('./routes/app_time_management');
const allAppManagementRoutes = require('./routes/AppListroutes');

// Use Routes
app.use('/api/admin', adminRoutes); // Admin login and registration
app.use('/api/users', usersRoutes); // Active users routes
app.use('/api', userthemeRoutes); // Theme routes
app.use('/api/app_management', appManagementRoutes); // App management routes
app.use('/api/app_time_management', appTimeManagementRoutes); // App time management routes
app.use('/api/all_app_management', allAppManagementRoutes); // All apps management routes

// Serve static files from the React app build directory (frontend)
app.use(express.static(path.join(__dirname, '../famieAdmin-frontend/build')));

// Example API route
app.get('/api/some-endpoint', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Catch-all handler for any other routes to serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../famieAdmin-frontend/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5252;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
