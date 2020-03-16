var mongoose = require('mongoose');
var createdOrderSchema = new mongoose.Schema({
    userInfo: {
        name: String,
        email: String,
        phone: Number,
        country: String,
        region: String,
        city: String,
        np: mongoose.Mixed
    },
    chosenProducts: [{
        id: mongoose.Mixed,
        name: String,
        price: Number,
        quantity: Number,
        size: String
    }],
    time: String
}, {collection: 'createdOrders'});

module.exports = mongoose.model("CreatedOrderModel", createdOrderSchema);
