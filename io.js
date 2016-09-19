"use strict";

exports.startSocket = function(http) {
	const io = require('socket.io')(http);

	let sockets = {},
		users = {
			"Group" : {
				name : "Group",
				status : "online"
			}
		};

	io.sockets.on('connection', function(socket) {
		socket.on('newUser', function(user) {
			sockets[user.name] = socket;
			users[user.name] = user;
			io.sockets.emit("availableUsers", users);
		});

		socket.on('userLeft', function(name) {
			delete sockets[name];
			delete users[name];
			io.sockets.emit("availableUsers", users);
		});

		socket.on('chatMessage', function(from, to, message) {
			if (to === "Group") io.sockets.emit('chatMessage', from, to, message);
			else sockets[to].emit('chatMessage', from, to, message);
		});

		socket.on('notifyTyping', function(from, to) {
			sockets[to].emit('notifyTyping', from);
		});
	});
};