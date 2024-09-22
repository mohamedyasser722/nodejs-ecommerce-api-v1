const express = require('express');
const dotenv = require('dotenv'); 
const morgan = require('morgan');

dotenv.config({path: './config.env'}) ;
const dbConnection = require('./config/database');
const categoryRoutes = require('./routes/categoryRoutes');

// connect to DB
dbConnection();

// Express App
const app = express();

// Middlewares
app.use(express.json());    // Body parser to read data from body

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log('Morgan enabled in development mode');
} 



//Mount Routes

app.use('/api/v1/categories', categoryRoutes);


// Server
const PORT = process.env.PORT || 3000;
app.listen(3000, () => { 
    console.log(`Server is running on port ${PORT}`);
});