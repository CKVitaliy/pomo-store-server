var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload;
    try {
        payload = jwt.verify(token, 'secretKey');
    } catch (err) {
        return res.status(401).send('Unauthorized request: ' + err.message)
    }
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject;
    next();
}

/* GET home page. */
router.get('/', verifyToken, function (req, res, next) {
    res.send({email: 'kot'})
});

module.exports = router;
