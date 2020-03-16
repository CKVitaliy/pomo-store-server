var mongoose = require('mongoose');
var createUserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
}, {collection: 'createdUsers'});

module.exports = mongoose.model("CreateUserModel", createUserSchema);
