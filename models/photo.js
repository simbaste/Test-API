var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({
	fileName: {
		type: String,
		required: true
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

var Photo = module.exports = mongoose.model('Photo', photoSchema);

module.exports.getPhotos = function(callback, limit) {
    Photo.find(callback).limit(limit);
};

module.exports.getPhotoById = function(id, callback) {
    Photo.findById(id, callback);
};

module.exports.addPhoto = function(photo, callback) {
    console.log(photo);
    Photo.create(photo, callback);
};