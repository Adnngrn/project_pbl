require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// static uploads
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR)));


// connect db
connectDB(process.env.MONGO_URI);


// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/events', require('./routes/events'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));