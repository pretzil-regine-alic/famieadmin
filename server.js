const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Configure CORS - allowing requests from any origin during development
// Modify this in production to restrict to your frontend domain
const allowedOrigins = ['http://localhost:3000', process.env.FRONTEND_URL];  // Add your production frontend URL here
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
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
const AppManagement = require('./models/AppManagement');
const AllappManagement = require('./models/AppList');
const AppTimeManagement = require('./models/AppTimeManagement');

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const usersRoutes = require('./routes/users');  // For active users
const userthemeRoutes = require('./routes/userthemeRoutes');
const appManagementRoutes = require('./routes/appManagementRoutes');
const appTimeManagementRoutes = require('./routes/app_time_management');
const allAppManagementRoutes = require('./routes/AppListroutes');

// Use Routes
app.use('/api/admin', adminRoutes);  // Admin login and registration
app.use('/api/users', usersRoutes);  // Active users routes
app.use('/api', userthemeRoutes);  // Theme routes
app.use('/api/app_management', appManagementRoutes);  // App management routes
app.use('/api/app_time_management', appTimeManagementRoutes);  // App time management routes
app.use('/api/all_app_management', allAppManagementRoutes);  // All apps management routes

// Serve static files from the React app build directory (frontend)
app.use(express.static(path.join(__dirname, '../famieAdmin-frontend/build')));

// Catch-all handler for any other routes to serve React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../famieAdmin-frontend/build/index.html'));
});

// Example API route
app.get('/api/someRoute', (req, res) => {
  res.json({ message: "Some route working!" });
});

// Start the server
const port = process.env.PORT || 5252;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
