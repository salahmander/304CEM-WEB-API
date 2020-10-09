const db = require('../../database')

module.exports.add = function (conData, favData, callback) {
	db.connect(conData, function (err, conn) {

		if (err) { //return error if there were problems connecting to database
			callback(err);
			return;
		}

		conn.query("INSERT INTO favourite  (itemID, userID) VALUES (\"" + favData.itemID + "\", \"" + favData.userID + "\");", favData, function (err, result) { // insert into favourite setting the item ID of the selected item and user ID

			callback(err, result);
		});
		
	})
};

module.exports.remove = function (conData, deleteData, callback) {
	db.connect(conData, function (err, conn) {

		if (err) { //return error if there were problems connecting to database
			callback(err);
			return;
		}
		conn.query('DELETE FROM favourite WHERE itemID= "' + deleteData.itemID + '" AND userID= "' + deleteData.userID + '"' , function (err, result){ //delete the users favourite where the item ID selected Equals the users ID

			callback(err, result);
		});
		
	})
};

module.exports.getAll = function (conData, favData, callback) {
	db.connect(conData, function (err, conn) {

		if (err) {//return error if there were problems connecting to database
			callback(err);
			return;
		}
		//select all items where the userID is equal to the user ID sent
		conn.query('SELECT itemID FROM favourite WHERE userID="' + favData.userID + '"', function (err, result) {

            if (err) { //return error if there were problems excuting the query
                err.code = 500;
                callback(err);
                return;
            }


            if (result && result.length > 0) { // if the result length return value return that value.
                callback(null, result);
            }
            else { // if value returned is nothing there user has no saved favourites. 
                const err = {
                    message: 'User had no favourites',
                    code: 401
                };
                callback(err);
            }


		});
	});
};