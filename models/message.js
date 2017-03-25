var mongoose = require('mongoose');

var adviceMsgSchema = mongoose.Schema({
	msgType: {
		type: String,
		default: "normal"
	},
	author: {
		type: {firstname: String, lastname: String},
		required: true
	},
	likes: {
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

var AdviceMsg = module.exports = mongoose.model('AdviceMsg', adviceMsgSchema);

module.exports.getAdviceMsgs = function(callback, limit) {
    AdviceMsg.find(callback).limit(limit);
};

module.exports.getAdviceMsgById = function(id, callback) {
    AdviceMsg.findById(id, callback);
};

module.exports.addAdviceMsg = function(adviceMsg, callback) {
    console.log(adviceMsg);
    AdviceMsg.create(adviceMsg, callback);
};