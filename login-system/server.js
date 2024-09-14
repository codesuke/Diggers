const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const authRoutes = require('./routes/auth');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serving static files

// Routes
app.use('/auth', authRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loginSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Serve login.html when the user visits the login page
app.get('/login', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // __dirname will refer to 'Login System', so this path is correct
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
