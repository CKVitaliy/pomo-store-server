const jwt = require('jsonwebtoken');
const userModel = require('./models/createUserSchema');
const admins = require('./adminsList');

exports.verifyAdminToken = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({name: 'Unauthorized request.'})
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send({name: 'Unauthorized request.'})
    }
    let payload;
    try {
        payload = jwt.verify(token, 'secretKey');
    } catch (err) {
        return res.status(401).send({name: `Unauthorized request: ${err.message}.`})
    }
    if (!payload) {
        return res.status(401).send({name: 'Unauthorized request.'})
    }
    userModel.findOne({_id: payload.subject}, function (err, singleUser) {
        if (err) {
            return res.status(500).send({"name": `${err.name}: Something bad happened on server side. Please try later`})
        } else {
            if (!admins.admins.find(function (el) {
                return el === singleUser.email
            })) {
                return res.status(401).send({name: 'This user have no administrators rights.'})
            }
        }
        next();
    });

};
