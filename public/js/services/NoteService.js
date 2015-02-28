//do API calls to the Node backend from Angular
angular.module('NoteService', []).factory('NoteSvc', function($http) {
	var o = {
		notes: []
	};
	//call to get all notes
	o.get = function() {
		return $http.get('/api/notes');
	},

	o.getRecent = function() {
		return $http.get('/api/notes/recent');
	},

	o.getByUser = function(username) {
		return $http.get('/api/notes/user/' + username);
	},

	o.getByCurrentUser = function(username) {
		return $http.get('/api/notes/user/' + username);
	},

	o.create = function(noteData) {
		return $http.post('/api/notes', noteData);
	},

	o.getNote = function(id) {
		return $http.get('/api/notes/' + id);
	}

	o.edit = function(id, noteData) {
		return $http.put('/api/notes/' + id, noteData);
	}

	o.delete = function(id) {
		return $http.delete('/api/notes/' + id);
	}

	return o;

});