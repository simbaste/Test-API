var mongoose = require('mongoose');
var Sync = require('sync');

var userSchema = mongoose.Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String,
		required: true
	},
	age: {
		type: Number
	},
	accessToken: {
		type: String,
		required: true
	},
	groups: {
		type: [String]
	},
	friends: {
		type: [{firstname: String, lastname: String}]
	},
	register_date: {
		type: Date,
		default: Date.now
	}
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUsers = function(callback, limit) {
    User.find(callback).limit(limit);
};

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByName = function(name, callback) {
	User.findOne({firstname: name.firstname,
    	lastname: name.lastname}, callback);
}

module.exports.getFriends = function(user, callback) {
	var query = User.find({});

	User.find({friends: {firstname: user.firstname,
	 lastname: user.lastname}}, callback);
}

module.exports.addUser = function(user, callback) {
	var isOk = false;
    var response = {success: true, error: false, message: "Success"};

    User.findOne({firstname: user.firstname,
     lastname: user.lastname}, function(err, MyUser) {
     	if (err) {throw err;}
     	if (MyUser) {
     		response = {success: false, error: true, message: "User already exist"};
     	}
     	isOk = true;
     });
    while(!isOk) {
      require('deasync').runLoopOnce();
    }
    if (response.success)
	    User.create(user, callback);
    return (response);
}

module.exports.updateUser = function(id, callback) {
	User.findOne({_id: id}, callback);
}

module.exports.addFriend = function(id, friend, callback) {
	var isOk = false;
	var isUser = false;
	var response = {success: true, error: false, message: "Success"};

	if(!friend["firstname"] || !friend["lastname"]) {
		return ({success: false, error: true, message: "Wrong parameter: friend"});
	}
	User.find({_id: id}, {friends: {$contains: {firstname: friend.firstname,
	 lastname: friend.lastname}}}, function(err, MyUser) {
	 	console.log("MyUser");
	 	console.log(MyUser);
	 	if (MyUser !== undefined) {
	 		console.log("get friend");
	 		isUser = true;
			//MyUser	 		
	 	}
	 	isOk = true;
	 });
	while(!isOk) {
      require('deasync').runLoopOnce();
    }
    if (!isUser) {
    	console.log("add new friend");
    	console.log(friend);
		User.findOneAndUpdate({_id: id}, {$push: {friends: friend}}, callback);
    }
	return response;
}
