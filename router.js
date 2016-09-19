"use strict";

exports.route = function(handle, pathname, response) {
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response);
	} else {
		response.send("404 Not found");
	}
};