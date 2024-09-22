const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// 1- Create a schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: [true, 'Category name must be unique'], 
        minlength: [3, 'Category name must be at least 3 characters'],
        maxlength: [32, 'Category name must be at most 32 characters']
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,
}, { timestamps: true });

// Apply pagination plugin to the schema
categorySchema.plugin(mongoosePaginate);

// 2- Create a model
const CategoryModel = mongoose.model('Category', categorySchema);

// Export the model
module.exports = CategoryModel;