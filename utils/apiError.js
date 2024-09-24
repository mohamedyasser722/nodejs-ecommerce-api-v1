class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
        this.isOperational = true;
    }
}

// Helper functions to create common error types

const NotFoundError = (message = 'Resource not found') => {
    return new ApiError(message, 404);
};

const BadRequestError = (message = 'Invalid request') => {
    return new ApiError(message, 400);
};

const InternalServerError = (message = 'Something went wrong') => {
    return new ApiError(message, 500);
};

const UnauthorizedError = (message = 'Unauthorized') => {
    return new ApiError(message, 401);
};

const DuplicateError = (message = 'Duplicate resource') => {
    return new ApiError(message, 409);
};

module.exports = {
    NotFoundError,
    BadRequestError,
    InternalServerError,
    UnauthorizedError,
    DuplicateError
};