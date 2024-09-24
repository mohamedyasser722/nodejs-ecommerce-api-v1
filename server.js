const express = require('express');
const dotenv = require('dotenv'); 
const morgan = require('morgan');
const ApiError = require('./utils/apiError');
dotenv.config({path: './config.env'}) ;
const dbConnection = require('./config/database');
const categoryRoutes = require('./routes/categoryRoutes');
const globalError = require('./middlewares/errorMiddleware');

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

// Catch-all route for undefined routes (404 errors)
app.all('*', (req, res, next) => {
    next(ApiError.NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

// Global Error Handler Middleware
app.use(globalError);

// Server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled rejections outside Express by Event Listener
process.on('unhandledRejection', (err) => {
    console.error(`UNHANDLED REJECTION: ${err}, Shutting down...`);
    
    // Stop the server gracefully after finishing all pending requests
    server.close(() => {
        console.log('Closed all open connections.');
        process.exit(1);
    });
});

// Optionally handle termination signals 
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('Closed all open connections.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('Closed all open connections.');
        process.exit(0);
    });
});