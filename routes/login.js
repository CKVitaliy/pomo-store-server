const express = require('express');
const jwt = require('jsonwebtoken');
const admins = require('../adminsList');
const router = express.Router();
const usersModel = require('./../models/createUserSchema');

router.post('/', function (req, res, next) {

    usersModel.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            res.status(500).send({"name": "Something bad happened on server side. Please try later"})
        } else {
            if (!user) {
                res.status(401).send({name: 'Invalid email'})
            } else if (user.password !== req.body.password) {
                res.status(401).send({name: 'Invalid password'})
            } else {
                let payload = {subject: user._id};
                let token = jwt.sign(payload, 'secretKey');
                if (admins.admins.find(function (element) {
                    return element === req.body.email;
                })) {
                    res.send({token: token, name: req.body.email, adminRights: true})
                } else {
                    res.send({token: token, name: req.body.email, adminRights: false})
                }
            }
        }
    })
});


module.exports = router;
