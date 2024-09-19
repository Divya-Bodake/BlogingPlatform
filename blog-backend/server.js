const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the express app first
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import routes after initializing the app
const postsRouter = require('./routes/posts');

// Use the routes after initializing the app
app.use('/posts', postsRouter);

// MongoDB connection
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server started on port ${port}`));
