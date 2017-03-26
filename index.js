var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');
var router = express.Router();
//var port = process.

mongoose.Promise = require('bluebird');
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

app.get('/api/firstname/:fname/lastname/:lname', function(req, res) {
	var params = {
		"firstname": req.params.fname,
		"lastname": req.params.lname
	};
	User.getUserByName(params, function(err, user) {
		if (err) {throw err;}
		user ? res.json(user) : res.json({success: false, error: true, message: "User not found"});
	});
});

app.get('/api/user/:_id', function(req, res) {
	User.getUserById(req.params._id, function(err, user) {
		if (err) {throw err;}
		user ? res.json(user) : res.json({success: false, error: true, message: "User not found"});
	});
});

app.get('/api/friends/firstname/:fname/lastname/:lname', function(req, res) {
	var params = {
		"firstname": req.params.fname,
		"lastname": req.params.lname
	};
	User.getUserByName(params, function(err, user) {
		if (err) {throw err;}
		user ? res.json(user.friends) : res.json({success: false, error: true, message: "User not found"});
	});
});

app.get('/api/user/:_id/friends', function(req, res) {
	User.getUserById(req.params._id, function(err, user) {
		if (err) {throw err;}
		user ? res.json(user.friends) : res.json({success: false, error: true, message: "User not found"});
	});
});

app.post('/api/user', urlencodedParser, function(req, res) {
	var user = req.body;
	if (!user.lastname || !user.accessToken)
		res.json({success: false, error: true, message: "Wrong parameters"});
	var response = User.addUser(user, function(err, Resp) {
		if (err) {throw err;}
	});
	res.json(response);
});

app.put('/api/user/:_id', urlencodedParser, function(req, res) {
	var user = req.body;
	User.updateUser(req.params._id, function(err, doc) {
		if (err) {throw err;}
		if (doc == undefined) {
			User.addUser(user, function(err, Resp) {
				if (err) {throw err;}
				res.json(Resp);
			});
		} else {
			for (var index in doc) {
				if (user[index]) {
					doc[index] = user[index];
				}
			}
			doc.save();
		}
		res.json(doc);
	});
});

app.delete('/api/user', urlencodedParser, function(req, res) {
	var user = req.body;

	User.delUser(user, function(err) {
		err ? res.json({success: false, error: true, message: "Can't delete user"}) :
			res.json({success: true, error: false, message: "Success"});
	});
});

app.delete('/api/user/:_id', function(req, res) {
	User.delUserById(req.params._id, function(err) {
		err ? res.json({success: false, error: true, message: "Can't delete user"}) :
			res.json({success: true, error: false, message: "Success"});
	});
});

app.post('/api/user/:_id/friend', urlencodedParser, function(req, res) {
	var friend = req.body;
	var response = {success: true, error: false, message: "Success"};
	var isOk = 0;

	User.getFriend(req.params._id, friend, function(err, doc) {
		if (err) {throw err;}
		var MyFriend = doc.friends;
		if (MyFriend.lenght > 0) {
			response = {success: false, error: true, message: "Friend already exist"};
		} else {
			User.addFriend(req.params._id, friend, function(err, doc) {
				if (err) {throw err;}
				isOk = 1;
			});
		}
		while(isOk != 1) {
      		require('deasync').runLoopOnce();
    	}
    	isOk = 2;
	});
	while(isOk != 2) {
      require('deasync').runLoopOnce();
    }
	res.json(response);
});

// Groups model
var Group = require('./models/group');

app.get('/api/groups', function(req, res) {
	Group.getGroups(function(err, groups) {
		if (err) {throw err;}
		res.json(groups);
	});
});

app.get('/api/group/:_id', function(req, res) {
	Group.getGroupsById(req.params._id, function(err, group) {
		if (err) {throw err;}
		res.json(group);
	});
});

app.get('/api/group/firstname/:fname/lastname/:lname', function(req, res) {
	var author = {
		"firstname": req.params.fname,
		"lastname": req.params.lname
	};
	Group.getGroupByAuthor(author, function(err, group) {
		if (err) {throw err;}
		group ? res.json(group) : res.json({success: false, error: true, message: "User not group"});
	});
});

app.post('/api/group', urlencodedParser, function(req, res) {
	var group = req.body;
	if (!group.name || !group.category) {
		res.json({success: false, error: true, message: "Wrong parameters"});
		return ;
	}
	Group.addGroup(group, function(err, group) {
		if (err) {throw err;}
		res.json(group);
	});
});

app.delete('/api/group', urlencodedParser, function(req, res) {
	var group = req.body;

	User.delGroup(group, function(err) {
		err ? res.json({success: false, error: true, message: "Can't delete group"}) :
			res.json({success: true, error: false, message: "Success"});
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

app.get('/api/adviceMsgs/:_id', function(req, res) {
	AdviceMsg.getAdviceMsgById(req.param.s._id, function(err, adviceMsg) {
		if (err) {throw err;}
		res.json(adviceMsg);
	});
});

app.get('/api/adviceMsg/firstname/:fname/lastname/:lname', function(err, adviceMsgs) {
	var author = {
		"firstname": req.params.fname,
		"lastname": req.params.lname
	};
	AdviceMsg.getAdviceMsgByAuthor(author, function(err, adviceMsgs) {
		if (err) {throw err;}
		adviceMsgs ? res.json(adviceMsgs) : res.json({success: false, error: true, message: "don't find any message"});
	});
});

app.post('/api/adviceMsg', urlencodedParser, function(req, res) {
	var adviceMsg = req.body;

	if (!adviceMsg.msgType || !adviceMsg.author) {
		res.json({success: false, error: true, message: "Wrong parameters"});
		return ;
	}
	AdviceMsg.addAdviceMsg(adviceMsg, function(req, res) {
		if (err) {throw err;}
		res.json(adviceMsg);
	});
});

app.delete('/api/adviceMsg', urlencodedParser, function(req, res) {
	var adviceMsg = req.body;

	AdviceMsg.delAdviceMsg(adviceMsg, function(err) {
		err ? res.json({success: false, error: true, message: "Can't delete message"}) :
			res.json({success: true, error: false, message: "Success"});
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

app.get('/api/photos/:_id', function(req, res) {
	Photos.getPhotoById(req.params._id, function(err, photo) {
		if (err) {throw err;}
		res.json(photo);
	});
});

app.get('/api/photos/firstname/:fname/lastname/:lname', function(req, res) {
	var author = {
		"firstname": req.params.fname,
		"lastname": req.params.lname
	};

	Photos.getPhotosByAuthor(author, function(err, photos) {
		if (err) {throw err;}
		photos ? res.json(photos) : res.json({success: false, error: true, message: "don't find any photos"});
	});
});

app.post('/api/photo', urlencodedParser, function(req, res) {
	var photo = req.body;
	Photos.addPhoto(photo, function(err, photo) {
		if (err) {throw err;}
		res.json(photo);
	});
});

app.delete('/api/photos', urlencodedParser, function(req, res) {
	var photo = req.body;

	AdviceMsg.delPhoto(photo, function(err) {
		err ? res.json({success: false, error: true, message: "Can't delete message"}) :
			res.json({success: true, error: false, message: "Success"});
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

app.get('/api/videos/:_id', function(req, res) {
	Photos.getPhotoById(req.params._id, function(err, video) {
		if (err) {throw err;}
		res.json(video);
	});
});

app.get('/api/videos/firstname/:fname/lastname/:lname', function(req, res) {
	var author = {
		"firstname": req.params.fname,
		"lastname": req.params.lname
	};

	Photos.getVideosByAuthor(author, function(err, photos) {
		if (err) {throw err;}
		videos ? res.json(videos) : res.json({success: false, error: true, message: "don't find any videos"});
	});
});

app.post('/api/video', urlencodedParser, function(req, res) {
	var video = req.body;
	Videos.addVideo(video, function(err, video) {
		if (err) {throw err;}
		res.json(video);
	});
});

app.delete('/api/videos', urlencodedParser, function(req, res) {
	var video = req.body;

	AdviceMsg.delVideo(video, function(err) {
		err ? res.json({success: false, error: true, message: "Can't delete message"}) :
			res.json({success: true, error: false, message: "Success"});
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

app.get('/api/books/:_id', function(req, res) {
    Books.getBookById(req.params._id, function(err, book) {
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
