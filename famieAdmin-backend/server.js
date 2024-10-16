const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Configure CORS - allowing requests from your frontend URL
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Make sure this is defined in your .env
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Parse incoming requests
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
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
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5252;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
