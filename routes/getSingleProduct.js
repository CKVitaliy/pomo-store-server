const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const createdProductModel = require('./../models/createProductSchema');

router.get('/', function(req, res, next) {
    const singleProductId = req.query.name;
    createdProductModel.findOne({_id: singleProductId}, function (err, singleProduct) {
        if (err) {
            res.status(500).send({"name": `${err.name}: Something bad happened on server side. Please try later`})
        } else {
            res.send({singleProduct})
        }

    });
});

module.exports = router;
