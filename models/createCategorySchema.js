const mongoose = require('mongoose');
const createCategorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true, unique: true}
}, {collection: 'createdCategories'});

module.exports = mongoose.model("CreateCategoryModel", createCategorySchema);
