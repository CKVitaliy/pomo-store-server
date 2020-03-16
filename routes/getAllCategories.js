const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createCategoryModel = require('./../models/createCategorySchema');

router.get('/', function (req, res, next) {
    createCategoryModel.find({}, function (err, allCategoryArray) {
        if (err) {
            res.status(500).send({"name": "Something bad happened on server side. Please try later"})
        } else {
            res.send({allCategoryArray})
        }
    });
});

module.exports = router;
