"use strict";

const server		  = require("./server"),
	  router		  = require("./router"),
	  requestHandlers = require("./requestHandlers");

let handle = {};
handle["/"] = requestHandlers.start;

server.start(router.route, handle);