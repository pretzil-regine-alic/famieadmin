const express = require('express');
const someRoute = require('./routes/someRoute');  // Import the route

const app = express();

app.use(express.json());  // Middleware to parse JSON

// Use the someRoute handler for /api/someRoute
app.use('/api/someRoute', someRoute);

// Catch-all route to serve the frontend (for React or other SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));  // Serve the React frontend
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
