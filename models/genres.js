var mongoose = require('mongoose');

// Genre Schema

var genreSchema = mongoose.Schema({
    name: {
	type: String,
	required: true
    },
    create_date: {
	type: Date,
	Default: Date.now
    }
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

module.exports.getGenres = function(callback, limit) {
    Genre.find(callback).limit(limit);
};

module.exports.addGenre = function(genre, callback) {
    console.log("Je suis dans le fonction addGenre");
    console.log(genre);
    Genre.create(genre, callback);
};
