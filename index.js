var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');
//var port = process.

//mongoose.connect('mongodb://ec2-54-154-41-116.eu-west-1.compute.amazonaws.com:27017/data/db');
mongoose.connect('mongodb://localhost/books');
var db = mongoose.connection;

// Setup the Forest Liana middleware in your app.js file
app.use(require('forest-express-mongoose').init({
  modelsDir: __dirname + '/models', // Your models directory.
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  mongoose: require('mongoose') // The mongoose database connection.
}));


// Genre model
var Genres = require('./models/genres');

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

app.post('/api/genres', urlencodedParser, function(req, res) {
    var genre = req.body;
    console.log("POST: req.body.name = "+req.body.name);
    console.log(req.body);
    Genres.addGenre(genre, function(err, book) {
	if (err) {
	    throw err;
	}
	res.json(genre);
    });
});

// Books model
var books = require('./models/books');

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

app.listen(3000, function() {
	console.log("Hey le test de PM2 Tech");
	console.log("Running on port 3000");	
});
