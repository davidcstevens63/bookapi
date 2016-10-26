// JavaScript source code

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

var db;
if (process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/Books', bookRouter);
//app.use('/api/author', authorRouter);

app.get('/', function (req, res) {
    res.send(('Welocome to our api '))
});

app.listen(port, function () {
    console.log("Gulp is running on port: " + port);
});

module.exports = app;