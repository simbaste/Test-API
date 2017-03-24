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

// Users model
var User = require('./models/user');

app.get('/api/users', function(req, res) {
	User.getUsers(function(err, users) {
		if (err) {throw err;}
		res.json(users);
	});
});

app.get('/api/user:_id', function(req, res) {
	User.getUserById(req.param.s._id, function(err, user) {
		if (err) {throw err;}
		res.json(user);
	});
});

app.post('/api/user', urlencodedParser, function(req, res) {
	var user = req.body;
	Users.addUser(user, function(err, user) {
		if (err) {throw err;}
		res.json(user);
	});
});

// Groups model
var Group = require('./models/group');

app.get('/api/groups', function(req, res) {
	Group.getGroups(function(err, groups) {
		if (err) {throw err;}
		res.json(groups);
	});
});

app.get('/api/group:_id', function(req, res) {
	Group.getGroupsById(req.param.s._id, function(err, group) {
		if (err) {throw err;}
		res.json(group);
	});
});

app.post('/api/group', urlencodedParser, function(req, res) {
	var group = req.body;
	Group.addGroup(group, function(err, group) {
		if (err) {throw err;}
		res.json(group);
	});
});

// Messages model
var AdviceMsg = require('./models/message');

app.get('/api/adviceMsgs', function(req, res) {
	AdviceMsg.getAdviceMsgs(function(err, adviceMsgs) {
		if (err) {throw err;}
		res.json(adviceMsgs);
	});
});

app.get('/api/adviceMsgs:_id', function(req, res) {
	AdviceMsg.getAdviceMsgById(req.param.s._id, function(err, adviceMsg) {
		if (err) {throw err;}
		res.json(adviceMsg);
	});
});

app.post('/api/adviceMsg', function(req, res) {
	var adviceMsg = req.body;
	AdviceMsg.addAdviceMsg(adviceMsg, function(req, res) {
		if (err) {throw err;}
		res.json(adviceMsg);
	});
});

// Photos model
var Photos = require('./models/photo');

app.get('/api/photos', function(req, res) {
	Photos.getPhotos(function(err, photos) {
		if (err) {throw err;}
		res.json(photos);
	});
});

app.get('/api/photos:_id', function(req, res) {
	Photos.getPhotoById(req.param.s._id, function(err, photo) {
		if (err) {throw err;}
		res.json(photo);
	});
});

app.post('/api/photo', function(req, res) {
	var photo = req.body;
	Photos.addPhoto(photo, function(err, photo) {
		if (err) {throw err;}
		res.json(photo);
	});
});

// Videos model
var Videos = require('./models/video');

app.get('/api/videos', function(req, res) {
	Photos.getVideos(function(err, videos) {
		if (err) {throw err;}
		res.json(videos);
	});
});

app.get('/api/videos:_id', function(req, res) {
	Photos.getPhotoById(req.param.s._id, function(err, video) {
		if (err) {throw err;}
		res.json(video);
	});
});

app.post('/api/video', function(req, res) {
	var video = req.body;
	Videos.addVideo(video, function(err, video) {
		if (err) {throw err;}
		res.json(video);
	});
});

// Genres model
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
