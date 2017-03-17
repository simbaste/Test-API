var mongoose = require('mongoose');

// Genre Schema

var bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
	   type: String,
	   required: true
    },
    description: {
	   type: String
    },
    author: {
	   type: String,
	   required: true
    },
    publisher: {
	   type: String,
    },
    pages: {
	   type: String,
    },
    create_date: {
	type: Date,
	Default: Date.now
    }
});

var Book = module.exports = mongoose.model('Book', bookSchema);

module.exports.getBooks = function(callback, limit) {
    Book.find(callback).limit(limit);
};

module.exports.getBookById = function(id, callback) {
    Book.findById(id, callback);
};
