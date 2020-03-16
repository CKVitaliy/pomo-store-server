const mongoose = require('mongoose');
const createdProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    group: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
        required: true
    },
    image: {type: [String], required: true, unique: true}
}, {collection: 'createdProducts'});

module.exports = mongoose.model("CreatedProductModel", createdProductSchema);

