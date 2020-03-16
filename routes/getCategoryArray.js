const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createdProductModel = require('./../models/createProductSchema');

router.get('/', function(req, res, next) {
    const categoryName = req.query.name;
    createdProductModel.find({group: categoryName}, function (err, createdProductsArray) {
        if (err) {
            res.status(500).send({"name": `${err.name}: Something bad happened on server side. Please try later`})
        } else {
            res.send({createdProductsArray})
        }

    });
});

module.exports = router;
