require("./extensions/string");
require("./extensions/number");
require("./extensions/array");
require("./inheritance");

var express = require("express");
var config = require("./config");
var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));

var MAX_AGE = 2592000000;

console.log("Starting...");

var app = express.call(this);
_configureApplication(app);

app.get("/angular-js-rotate-flip", function(request, response) { _send("public/views/angularJsRotateFlip.html", response); });

app.listen(config.call(this, "serverPort"));
console.log("Listening on " + config.call(this, "serverPort"));

function _send(file, response) {
	return fs.readFileAsync(file).then(function(content) {
		response.send(content.toString());
	}).catch(function(e) {
		response.send(e.stack.formatStack(), 500);
	});
}

function _configureApplication(app) {
	app.configure(function () {
		app.use(express.compress());
		app.use(express.json());
		app.use(express.urlencoded());
		app.use(express.static(__dirname + "/public", { maxAge: MAX_AGE }));
		app.use(express.cookieParser());
	});

	app.configure("development", function () { Promise.longStackTraces(); app.set("env", "development"); });
	app.configure("production", function () { app.set("env", "production"); });
}