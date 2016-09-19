"use strict";

exports.start = function(route, handle) {
	const express	= require("express"),
		  app	 	= express(),
		  http 		= require("http").Server(app),
		  io 		= require('./io'),
		  url		= require("url");

	app.use(express.static('public'));

	app.all('*', function(request, response) {
		let pathname = url.parse(request.url).pathname;
		route(handle, pathname, response);
	});

	io.startSocket(http);

	http.listen(process.argv[3], process.argv[2], function(){
		console.log('Application started at http://' + process.argv[2] + ':' + process.argv[3]);
	});	
};