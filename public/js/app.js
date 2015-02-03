angular.module('thankYou', 
	[
		'ngRoute', 
		'appRoutes', 
		'NotesCtrl', 
		'AccountCtrl', 
		'NoteService',
		'UserService',
		'ui.tinymce',
		'ngSanitize'
	]

).run(function($rootScope, $timeout) {
	(function connect() {
		if(window.location.protocol === 'https') {
			var url = 'wss://' + window.location.host;
		} else {
			var url = 'ws://' + window.location.host;
		}

		var connection = new WebSocket(url);

		connection.onopen = function() {
			console.log('Websocket connected');
		}

		connection.onclose = function(e) {
			console.log('Websocket closed. Reconnecting...');
			$timeout(connect, 10*1000);
		}

		connection.onmessage = function(e) {
			console.log(e);
			var payload = JSON.parse(e.data);
			$rootScope.$broadcast('ws:' + payload.topic, payload.data);
		}
	})();
});