var jwt = require('jwt-simple');
var config = require('../config/db');

module.exports = function(req, res, next) {
	if(req.headers['x-auth']) {
		req.auth = jwt.decode(req.headers['x-auth'], config.secret);
		console.log('req.auth: ' + req.auth.username);
	} else {
		console.log('req.auth not x-auth: ' + req.auth);
	}
	next();
};