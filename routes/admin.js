const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage});
const createdCategoryModel = require('./../models/createCategorySchema');
const createdProductModel = require('./../models/createProductSchema');
const createdOrderModel = require('./../models/createOrderSchema');


router.post('/createCategory', upload.single('image'), function (req, res, next) {
    const newCategory = new createdCategoryModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.file.path
    });
    newCategory.save(err => {
        if (err) {
            res.status(400).send({"name": `${err.name}: Name and Image must be unique.`});
        } else {
            res.status(201).send({"name": `Success, you added a category ${req.body.name}`});
        }
    })
});

router.delete('/deleteCategory/:id', function (req, res) {
    createdCategoryModel.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            res.status(500).send({"name": `${err.name}: Something bad happened on server side. Please try later`});
        } else {
            res.send()
        }
    })
});

router.post('/createProduct', upload.array('image[]', 5), function (req, res, next) {
    let filesArray = [];
    for (var i = 0; i < req.files.length; i++) {
        filesArray.push(req.files[i].path)
    }
    const newProduct = new createdProductModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        quantity: 1,
        group: req.body.group,
        size: "XS",
        image: filesArray
    });
    newProduct.save(function (err) {
        if (err) {
            res.status(400).send({"name": `${err.name}: Name and Image must be unique.`})
        } else {
            res.send({"name": `Success, you added a product ${req.body.name}`});
        }
    })
});


router.get('/editProduct', function (req, res) {
    createdProductModel.find({}, function (err, createdProductsArray) {
        if (err) {
            res.status(500).send({"name": "Something bad happened. Please try later"})
        } else {
            res.send(createdProductsArray)
        }
    });
});

router.post('/editProduct', function (req, res) {
    createdProductModel.updateOne({_id: req.body._id}, {name: req.body.name, price: req.body.price, group: req.body.group},
        function (err, doc) {
            if (err) {
                res.status(400).send({"name": `${err.name}: Products Name must be unique.`});
            } else {
                res.status(201).send({"name": `Success, you updated ${req.body.name} product`});
            }
        }
    );

});

router.delete('/editProduct/:id', function (req, res) {
    createdProductModel.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            res.status(500).send({"name": `${err.name}: Something bad happened on server side. Please try later`});
        } else {
            res.send()
        }
    })
});


router.get('/submit', function (req, res) {
    createdOrderModel.find({}, function (err, ordersArray) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.send(ordersArray)
        }
    })
});

router.post('/submit', function(req, res) {
    console.log(req.body);
    var newOrder = new createdOrderModel(req.body);
    newOrder.save(function (err) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.send({"name": "Success, you added an order "});
        }
    });
});

router.delete('/submit/:id', function (req, res) {
    createdOrderModel.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.status(204).send()
        }
    })
});


module.exports = router;
