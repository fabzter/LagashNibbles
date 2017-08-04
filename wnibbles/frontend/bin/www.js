#!/usr/bin/env node
"use strict";

//module dependencies
const server = require("../dist/server/server");
const debug = require("debug")("express:server");
const http = require("http");

//create http server
const httpPort = normalizePort(process.env.PORT || 9000);
const app = server.Server.bootstrap().app;
app.set("port", httpPort);
const httpServer = http.createServer(app);

//listen on provided ports
httpServer.listen(httpPort);

//add error handler
httpServer.on("error", onError);

//start listening on port
httpServer.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  throw error;
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  let addr = httpServer.address();
  let bind = typeof addr === "string"
    ? "pipe " + addr
    : "port " + addr.port;
  console.log("Listening on " + bind);
}