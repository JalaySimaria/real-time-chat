angular.module('chatApp', [])

.controller('chatController', function($scope) {
	const socket = io();

	$scope.default = {
		me : '',
		users : {},
		current : '',
		message : ''
	};

	function makeid() {
		var person = prompt("What's your name?");

		if (person) return person;
		else {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for( var i=0; i < 5; i++ ) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
	}

	(function() {
		$scope.default.me = makeid();
		socket.emit('newUser', {
			name : $scope.default.me,
			status : "online"
		});
	})();

	$scope.switchMsgContainer = function(user) {
		$scope.default.current = user;
		$scope.default.users[user].status = "online";
	};

	$scope.notifyTyping = function(event) {
		if ($scope.default.message && $scope.default.current) {
			if (event.keyCode === 13) {
				socket.emit('chatMessage', $scope.default.me, $scope.default.current, $scope.default.message);
				$("#" + $scope.default.current).append("<li class='me'>" + $scope.default.message + "</li>")
				$scope.default.message = '';
			} else if ($scope.default.current !== "Group") socket.emit('notifyTyping', $scope.default.me, $scope.default.current);
		}
	};

	socket.on('availableUsers', function(users) {
		$scope.default.users = users;
		if (!$scope.$$phase) $scope.$apply();
	});

	socket.on('chatMessage', function(from, to, msg) {
		if ($scope.default.current !== "Group" && to === "Group") {
			$scope.default.users[to].status = "New Message";
		} else if ($scope.default.current !== from) {
			$scope.default.users[from].status = "New Message";
		}
		if (!$scope.$$phase) $scope.$apply();

		if (from !== $scope.default.me) {
			let selector = "#" + (to === "Group" ? to : from), str = "";

			if (to === "Group") str = "<li class='opposite'><b>" + from + ":</b> " + msg + "</li>";
			else str = "<li class='opposite'>" + msg + "</li>";

			$(selector).append(str);
		}
	});

	socket.on('notifyTyping', function(from) {
		if ($scope.default.current !== from) {
			$scope.default.users[from].status = "typing...";
			if (!$scope.$$phase) $scope.$apply();
		}
	});

	window.onbeforeunload = function() {
		socket.emit('userLeft', $scope.default.me);
	};
});