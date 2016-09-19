"use strict";

exports.start = function(response) {
	response.sendFile(__dirname + "/views/index.html");
};