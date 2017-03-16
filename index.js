var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

var Genres = require('./models/genres');
var books = require('./models/books');

mongoose.connect('mongodb://localhost/Testdb');
var db = mongoose.connection;

app.get('/', function(req, res) {
    res.send('Hello world');
});

app.get('/api/genres', function(req, res) {
    Genres.getGenres(function(err, genres) {
	if (err) {
	    throw err;
	}
	res.json(genres);
    });
});

app.get('/api/books', function(req, res) {
    Books.getBooks(function(err, books) {
	if (err) {
	    throw err;
	}
	res.json(books);
    });
});

app.get('/api/books:_id', function(req, res) {
    Books.getBookById(req.param.s._id, function(err, book) {
	if (err) {
	    throw err;
	}
	res.json(book);
    });
});

app.post('/api/genres', urlencodedParser, function(req, res) {
    var genre = req.body;
    console.log("POST: req.body=");
    console.log(req.body);
    Genres.addGenre(genre, function(err, book) {
	if (err) {
	    throw err;
	}
	res.json(genre);
    });
});

app.listen(3000);
console.log("Running on port 3000");
