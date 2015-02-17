var Notes = require('./models/notes');
var User = require('./models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../config/db');
var auth = require('./auth');
var websockets = require('./websockets');

module.exports = function(app) {
	// server routes
	app.get('/api/notes', function(req, res) {
		// use mongoose to get all notes in the database
		Notes.find(function(err, notes) {
			if(err) {
				res.send(err);
			}
			res.json(notes);
		});
	});

	app.post('/api/notes', function(req, res) {
		//if(req.headers['x-auth']) {
			//req.auth = jwt.decode(req.headers['x-auth'], config.secret);
			var note = new Notes({
				username: req.auth.username,
				yourName: req.body.yourName,
				theirName: req.body.theirName,
				pageTitle: req.body.pageTitle,
				pageContent: req.body.pageContent
			});
			// use mongoose to post a new note in the database
			note.save(function(err, notes) {
				if(err) {
					res.send(err);
				}
				websockets.broadcast('note_update', note);
				res.json(201, notes);
			});
		//} else {
		//	res.send(401); //not logged in (no username associated)
		//}
	});

	app.get('/api/notes/user/:username', function(req, res) {
		var username = req.params.username;

		var query = Notes.find({});
		query.where('username', username);

		query.exec(function (err, notes) {
		 	if(err) {
		 		res.send(err);
		 	} 
		  	if (notes) {
				console.log('notes:' + notes);
	  			res.json(201, notes); 
		  	}
		});
	});

	app.get('/api/notes/:id', function(req, res) {
		var id = req.params.id;
		Notes.findById(id, function (err, notes) {
		 	if(err) {
		 		res.send(err);
		 	}
		  	if (notes) {
	  			res.json(201, notes); 
		  	}
		});
	});

	app.put('/api/notes/:id', function(req, res) {
		var id = req.params.id;
		Notes.findById(id, function (err, note) {
			note.yourName = req.body.yourName;
			note.theirName = req.body.theirName;
			note.pageTitle = req.body.pageTitle;
			note.pageContent = req.body.pageContent;
		 	if(err) {
		 		res.send(err);
		 	}
		  	if (note) {
				note.save(function(err) {
					if(err) {
						res.send(err);
					}
					websockets.broadcast('note_update', note);
					res.json(201, note);
				});
		  	}
		});
	});

	app.delete('/api/notes/:id', function(req, res) {
		var id = req.params.id;
		Notes.findById(id, function (err, note) {
		 	if(err) {
		 		res.send(err);
		 	}
		  	if (note) {
				note.remove(function(err) {
					if(err) {
						res.send(err);
					}
					websockets.broadcast('note_update', note);
					res.json();
				});
		  	}
		});
	});

	//authentication api routing
	app.post('/api/sessions', function(req, res, next) {
		User.findOne({username: req.body.username})
			.select('password').select('username')
			.exec(function (err, user) {
				if(err) { return next(err); }
				if(!user) { return res.send(401); }
				bcrypt.compare(req.body.password, user.password, function(err, valid) {
					if(err) { return next(err); }
					if(!valid) { return res.send(401); }
					var token = jwt.encode({username: user.username}, config.secret);
					console.log(token);
					res.send(token);
				});
			});
	});

	app.get('/api/users', function(req, res, next) {
		if(!req.headers['x-auth']) {
			console.log('req.headers is not x-auth');
			return res.send(401);
		}
		var auth = jwt.decode(req.headers['x-auth'], config.secret);
		User.findOne({username: auth.username}, function(err, user) {
			if(err) { return next(err); }
			res.json(user);
		});
	});

	app.post('/api/users', function(req, res, next) {
		var user = new User({
			username: req.body.username,
			name: req.body.name,
			email: req.body.email
		});
		User.findOne({username: user.username}, function(err, result) {
		    if (err) { console.log('error determining if username already exists'); }

		    if (result) {
		        return res.send(401, 'username already exists');
		    } else {
				bcrypt.hash(req.body.password, 10, function(err, hash) {
					if(err) { return next(err); }
					user.password = hash;
					user.save(function(err) {
						if(err) { return next(err); }
						res.send(201);
					});
				});
		    }
		});
	});

	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html');
	});
};