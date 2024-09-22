const express = require('express');

const {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../services/categoryService');

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(createCategory);
router.route('/:id').get(getCategoryById);
router.route('/:id').put(updateCategory);
router.route('/:id').delete(deleteCategory);

module.exports = router;