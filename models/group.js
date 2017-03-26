var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	category: {
		type: String,
		default: "public",
		required: true
	},
	creator: {
		type: {firstname: String, lastname: String}
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

var Group = module.exports = mongoose.model('Group', groupSchema);

module.exports.getGroups = function(callback, limit) {
    Group.find(callback).limit(limit);
};

module.exports.getGroupById = function(id, callback) {
    Group.findById(id, callback);
};

module.exports.getGroupByAuthor = function(author, callback) {
	Group.find(author, callback);
};

module.exports.addGroup = function(group, callback) {
    Group.create(group, callback);
};

module.exports.delGroup = function(group, callback) {
	User.remove(group, callback);
};