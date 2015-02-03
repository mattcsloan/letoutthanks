var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
	email: {type: String, required: true},
	name: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true, select: false}
});