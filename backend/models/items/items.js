const db = require('../../database')


module.exports.getAll = function(conData, callback){
	
	// conection to database 
	db.connect(conData, function(err, conn){
		
		if (err) { //return error if there were problems connecting to database
			callback(err);
			return;
        }

        conn.query('SELECT * FROM items', function (err, computerData) {

				callback(err, computerData);
			 
		});
	});
};

module.exports.add = function(conData, itemData, callback){
	db.connect(conData, function(err, conn){

		if (err) { //return error if there were problems connecting to database
			callback(err);
			return;
		} //insert a new item where the fields equal the value.
		conn.query("INSERT INTO items  (userID, title, description, location, item_condition, image, mobile, price) VALUES (\""+itemData.userID+"\", \""+itemData.title+"\", \""+itemData.description+"\", \""+itemData.location+"\", \""+itemData.condition+"\", \""+itemData.image+"\", \""+itemData.mobile+"\", \""+itemData.price+"\");", itemData, function(err,result){

			callback(err, result);
		});
	});
};

module.exports.remove = function(conData, deleteData, callback){
	db.connect(conData, function(err, conn){
 
		if (err) { //return error if there were problems connecting to database
			callback(err);
			return;
		}

		conn.query('DELETE FROM items WHERE itemID= "' + deleteData.itemID + '"', function (err, result){ //delete item related to the ItemID

			callback(err, result);
		});

	});
};