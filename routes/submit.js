var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var createdOrders = require('./../models/createOrderSchema');



router.post('/', function(req, res) {
    console.log(req.body);
    var newOrder = new createdOrders(req.body);
    newOrder.save(function (err) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.send({"name": "Success, you added an order "});
        }
    });
});

router.get('/', function (req, res) {
    createdOrders.find({}, function (err, ordersArray) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.send(ordersArray)
        }
    })
});

router.delete('/:id', function (req, res) {
    createdOrders.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(204).send()
        }
    })
});

module.exports = router;
