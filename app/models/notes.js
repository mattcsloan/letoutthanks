var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Notes', {
	username: {type: String, default: ''},
	yourName: {type: String, default: ''},
	theirName: {type: String, default: ''},
	pageTitle: {type: String, default: ''},
	pageContent: {type: String, default: ''}
});