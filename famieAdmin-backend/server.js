const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Configure CORS - allowing requests from your frontend URL
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Ensure this is defined in your .env
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Parse incoming requests
app.use(express.json());

// Use the MongoDB URI from the .env file, with a fallback to a placeholder if needed
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://famieproject:Thesis1234@cluster1.qbwax.mongodb.net/famie';

if (!mongoURI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));

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
app.use('/api/admin', adminRoutes);
app.use('/api/users', usersRoutes);
app.use('/api', userthemeRoutes);
app.use('/api/app_management', appManagementRoutes);
app.use('/api/app_time_management', appTimeManagementRoutes);
app.use('/api/all_app_management', allAppManagementRoutes);

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' }); // Changed to return JSON for better client handling
});

// Start the server
const PORT = process.env.PORT || 5252;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
