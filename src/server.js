const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const categoryRoutes = require('./routes/categories');

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});