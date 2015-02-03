var _ = require("lodash");
var ws = require("ws");
var clients = [];

exports.connect = function(server) {
	var wss = new ws.Server({server: server});
	wss.on('connection', function(ws) {
		//push new client into clients array
		clients.push(ws);

		exports.broadcast('new client joined');
		//remove client using lo-dash so messages aren't sent to disconnected clients
		ws.on('close', function() {
			_.remove(clients, ws);
		});

	});
};

exports.broadcast = function(topic, data) {
	var json = JSON.stringify({topic: topic, data: data});
	clients.forEach(function(client) {
		client.send(json);
	});
};