var _initialized = false;

module.exports = function(key) {
	var config = {
		"serverPort": 8079,
		"buildNumber": require("./package.json").version
	};

	if (!_initialized) {
		try {
			extend(config, require("./secureConfig.json"));
		} catch (e) {}

		for (var name in config)
			process.env["leaf." + name] = config[name];
		_initialized = true;
	}

	return process.env["leaf." + key];
};