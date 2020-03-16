var mongoose = require('mongoose');

/*const dbURI = 'mongodb://username:password@locahost/mydatabase';
var dbOptions = {
    user: 'userName',
    password: 'userPass'
};
mongoose.connect(dbURI, dbOptions);*/

const dbURI = 'mongodb://localhost:27017/pomoDB';

mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('connected', function () {
    console.log('Mongoose has connected to ' + dbURI)
});
mongoose.connection.on('error', function () {
    console.log('Mongoose has not connected to ' + dbURI)
});
module.exports = mongoose;
