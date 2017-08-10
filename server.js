"use strict";

exports.start = function(route, handle) {
	const express	= require("express"),
		  app	 	= express(),
		  http 		= require("http").Server(app),
		  io 		= require('./io'),
		  url		= require("url");

	app.use(express.static('public'));
	app.set('port', (process.env.PORT || 5000));

	app.all('*', function(request, response) {
		let pathname = url.parse(request.url).pathname;
		route(handle, pathname, response);
	});

	io.startSocket(http);

	http.listen(app.get('port'), function(){
		console.log('Application started.');
	});	
};