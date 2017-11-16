// dependencies
var mysql = require("mysql");

// configures the connection to the mysql database
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "barter_db" // database needs to be created
});

connection.connect(function(err) {
	if (err) {
		console.log("error connecting: " + err.stack);
		return;
	}

	console.log("connected as id: " + connection.threadId);
});

module.exports = connection;