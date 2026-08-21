require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (request, response) => {
    response.status(200).json({ message: 'Welcome to Restaurant APIs' });
});

app.use('/', authRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/menu', menuRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
