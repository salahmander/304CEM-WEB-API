const db = require('../../database') //import database

// add a new user to the database
module.exports.add = function (conData, userData, callback) {
	db.connect(conData, function (err, conn) {

		if (err) {  //return error if there were problems connecting to database
			callback(err);
			return;
		}
		//insert new users with data sent into user table
		conn.query("INSERT INTO user  (first_name, surname, email, username, password, role) VALUES (\"" + userData.firstName + "\", \"" + userData.surname + "\", \"" + userData.email + "\", \"" + userData.username + "\", \"" + userData.password + "\", \"" + userData.role + "\");", userData, function (err, result) {

			callback(err, result);
		});
		
	})
};

module.exports.getAll = function (conData, callback) { //retrieve all data asked by the request.
	db.connect(conData, function (err, conn) {

		if (err) { //return error if there were problems connecting to database
			callback(err);
			return;
		}

		conn.query('SELECT username, email FROM user', function (err, result) { //select username and email for validation 
			console.log(result)
			callback(err, result);

		});
	});
};