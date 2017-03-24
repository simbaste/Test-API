var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true
	},
	lastname: {
		type: String
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

module.exports.addUser = function(user, callback) {
    console.log(user);
    User.create(user, callback);
};