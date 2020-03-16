const express = require('express');
const jwt = require('jsonwebtoken');
const admins = require('../adminsList');
const router = express.Router();
const usersModel = require('./../models/createUserSchema');

router.post('/', function (req, res, next) {
    console.log(req.body);
    const newUser = new usersModel(req.body);
    newUser.save((err, user) => {
        console.log(err, user, admins.admins);
        if (err) {
            res.status(400).send({"name": `${err.name}: User with this Email is already exists. Email must be unique.`})
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
    });
});

module.exports = router;
