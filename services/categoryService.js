const slugify = require('slugify');
const CategoryModel = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const formatResponse = require('../utils/responseFormatter');
const apiError = require('../utils/apiError');
const MAX_LIMIT = 50;


exports.getCategories = asyncHandler(async (req, res) => {

    const options = {
        page: parseInt(req.query.page) || 1,
        limit: Math.min(parseInt(req.query.limit) || 10, MAX_LIMIT), // Enforce the maximum limit
        lean: true
    };

    const result = await CategoryModel.paginate({}, options); 
    const response = formatResponse(result);
    res.status(StatusCodes.OK).json(response);
});

// get category by id
exports.getCategoryById = asyncHandler(async (req, res, next) => {

    const id = req.params.id;
    const category = await CategoryModel.findById(id); 
    if (!category) {
        return next(apiError.NotFoundError('Category not found'));
    }
    res.status(StatusCodes.OK).json(category);
});




//#region 3 ways of creating category
// exports.createCategory = (req, res) => {
//     const name = req.body.name;
//     const category = new CategoryModel({ name: name });
    
//     // Save category using a callback
//     category.save((err, data) => {
//         if (err) {
//             // If an error occurs, respond with 400 and an error message
//             return res.status(400).json({
//                 error: 'Category not created',
//                 message: err.message
//             });
//         }
//         // If successful, return the saved category
//         res.json(data);
//     });
// };
// // 2- using promises
// exports.createCategory = (req, res) => {
//     const name = req.body.name;
//     const category = new CategoryModel({ name: name });
    
//     // Save category using a callback
//     category.save((err, data) => {
//         if (err) {
//             // If an error occurs, respond with 400 and an error message
//             return res.status(400).json({
//                 error: 'Category not created',
//                 message: err.message
//             });
//         }
//         // If successful, return the saved category
//         res.json(data);
//     });
// };
//#endregion

// 3- using async/await
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const slug = slugify(name, { lower: true });

    // Use .create() to create and save the category in one step
    const category = await CategoryModel.create({
        name: name,
        slug: slug
    });  
    res.status(201).json(category);
});

// update category
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, { name, slug: slugify(name) }, { new: true });
    if (!category) {
        return next(apiError.NotFoundError('Category not found'));
    }
    res.status(StatusCodes.OK).json(category);
});

// delete category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (!category) {
        return next(apiError.NotFoundError('Category not found'));
    }
    res.status(StatusCodes.NO_CONTENT).json({ message: 'Category deleted successfully' });
});