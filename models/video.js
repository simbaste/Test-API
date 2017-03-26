var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
	fileName: {
		type: String,
		required: true,
	},
	author: {
		type: {firstname: String, lastname: String},
		required: true
	},
	width: {
		type: Number,
		required: true
	},
	height: {
		type: Number,
		required: true
	},
	size: {
		type: Number,
	},
	Likes: {
		type: Number,
		default: 0
	},
	position: {
		type: {longitude: Number, latitude: Number, altitude: Number}
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

var Video = module.exports = mongoose.model('Video', videoSchema);

module.exports.getVideos = function(callback, limit) {
    Video.find(callback).limit(limit);
};

module.exports.getVideoById = function(id, callback) {
    Video.findById(id, callback);
};

module.exports.getVideosByAuthor = function(author, callback) {
	Video.find(author, callback);
};

module.exports.addVideo = function(video, callback) {
    console.log(video);
    Video.create(video, callback);
};

module.exports.delVideo = function(video, callback) {
	Video.remove(video, callback);
};