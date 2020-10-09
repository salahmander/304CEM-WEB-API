const mysql = require('mysql');

exports.connect = function(conData, callback){
	
	let conn = mysql.createConnection({
		  host: conData.host,
		  user: conData.user, 
		  password: conData.password, 
		  database: conData.database
		});
	conn.connect(function(err) {
		if (err) callback(err);
		callback(null, conn);
	});
};