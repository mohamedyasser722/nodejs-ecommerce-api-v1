const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

module.exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
];

module.exports.createCategoryValidator = [
    check('name')
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 32 }).withMessage('Category name must be between 3 to 32 characters'),
    validatorMiddleware
];

module.exports.updateCategoryValidator = [
    // Validate the 'id' param for MongoDB ObjectId
    check('id').isMongoId().withMessage('Invalid category id'),

    // Validate 'name' in the request body
    check('name')
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 32 }).withMessage('Category name must be between 3 to 32 characters'),

    // Middleware to handle validation results
    validatorMiddleware
];

module.exports.deleteCategoryValidator = [
    // Validate the 'id' param for MongoDB ObjectId
    check('id').isMongoId().withMessage('Invalid category id'),

    // Middleware to handle validation results
    validatorMiddleware
];