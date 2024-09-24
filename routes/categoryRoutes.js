const express = require('express');

const {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory 
} = require('../services/categoryService');

const router = express.Router();

// router.route('/')
//     .get(getCategories)
//     .post(createCategory);
// router.route('/:id').get(getCategoryById);
// router.route('/:id').put(updateCategory);
// router.route('/:id').delete(deleteCategory);
const { createCategoryValidator, getCategoryValidator ,updateCategoryValidator, deleteCategoryValidator} = require('../utils/validators/categoryValidator');

router.route('/')
    .get(getCategories)
    .post(createCategory, createCategoryValidator);

router.route('/:id')
    .get(getCategoryById, getCategoryValidator)
    .put(updateCategoryValidator, updateCategory) // Use the update validator
    .delete(deleteCategoryValidator, deleteCategory); // Use the delete validator




module.exports = router;