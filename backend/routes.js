const user = require('./models/user/user'); // import user model
const items = require('./models/items/items'); //import item model
const authentication = require('./models/authentication/authentication') //import authentication model
const favourites = require('./models/favourites/favourites') //import favourite model
const multer = require('multer') //import multer for handling image file

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/');   //location where the image is going to be stored
    },
    filename: function (req, file, callback) {
        let randomName = Math.random().toString(36).substring(7); // generate random string 
        let fileName = randomName + file.originalname     // concatenate the random string with original file name to create a new file name
        callback(null, fileName);
    }
});


const fileFilter = (req, file, callback) => {
    // reject a file if not correct file type
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


exports.allRoutes = function (databaseData, app) {  // retrieve all items 

    app.get('/api/v1.0/items', (req, res) => {       

        items.getAll(databaseData, function (err, result) {  // sending database data and retrieving results 

            if (err) { //respons with an error if there was a problem with connection or query 
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(201);    
            res.json(result)   // send result as json
        })
    });

    app.post('/api/v1.0/itemUpload', upload.single('productImage'), (req, res) => {
        let itemData = {  //stores all item data into object
            userID: req.body['userID'],
            title: req.body['title'],
            description: req.body['description'],
            location: req.body['location'],
            condition: req.body['condition'],
            image: "http://localhost:8080/images/" + req.file.filename,  //concatenate the path with the file name so that it can be accessed
            mobile: req.body['mobile'],
            price: req.body['price']
        }
        
        items.add(databaseData, itemData, function (err, result) {

            if (err) { //respons with an error if there was a problem with connection or query 
                res.status(400);
                res.end("error:" + err);
                return;
            }

            res.status(201);
            res.end(JSON.stringify({ message: "item added successfully" })); //return message if item has been successfully added to database
        })
    })

    app.delete('/api/v1.0/items', (req, res) => {
        let deleteData = {
            itemID: req.body['itemID'],
        }

        console.log(deleteData)
        items.remove(databaseData, deleteData, function (err, result) {

            if (err) { //respons with an error if there was a problem with connection or query 
                res.status(err.code);
                res.end(JSON.stringify(err))
                return;
            }
            res.end(JSON.stringify({ message: "item removed successfully" })); //return message if item has been removed successfully from database
        })
    })


    app.post('/api/v1.0/users', (req, res) => {

        let userData = {
            firstName: req.body['firstName'],
            surname: req.body['surname'],
            email: req.body['email'],
            username: req.body['username'],
            password: req.body['password'],
            role: req.body['role']
        }

        console.log(userData)
        user.add(databaseData, userData, function (err, result) {

            if (err) { //respons with an error if there was a problem with connection or query 
                res.status(400);
                res.end("error:" + err);
                return;
            }

            res.status(201);
            res.end(JSON.stringify({ message: "user added successfully" })); //returns message if user has been successfully added to database
        })



    });

    app.get('/api/v1.0/users', (req, res) => {

        user.getAll(databaseData, function (err, result) {

            if (err) { //respons with an error if there was a problem with connection or query 
                res.status(400);
                res.end("error:" + err);
                return;
            }

            res.status(201);  //respond with status code 201 meaning the query was successfull
            res.json(result) //send user data using json
        })
    });



    app.post('/api/v1.0/login', (req, res) => {

        authentication.loginUser(databaseData, req, (err, result) => {

            if (err) {
                res.status(err.code);
                res.end(JSON.stringify(err)) //respond with error message from authenticaiton 
                return;
            }
            res.end(JSON.stringify(result)) // turns successfull authenticaiton object into json so that it can be sent
        });
    });

    app.post('/api/v1.0/favourites', (req, res) => {

        let favData = {
            itemID: req.body['itemID'],
            userID: req.body['userID']
        }

        console.log(favData)
        favourites.add(databaseData, favData, function (err, result) {

            if (err) {
                res.status(400); //respons with an error if there was a problem with connection or query 
                res.end("error:" + err);
                return;
            }

            res.status(201);
            res.end(JSON.stringify({ message: "favourites added successfully" })); // respone with message for notificaiton
        })
    })

    app.post('/api/v1.0/favourite', (req, res) => {

        let favData = {
            userID: req.body['userID']
        }

        favourites.getAll(databaseData, favData, function (err, result) {

            if (err) {
                res.status(err.code);
                res.end(JSON.stringify(err))
                return;
            }
            res.end(JSON.stringify(result))
        })
    });

    app.delete('/api/v1.0/favourite', (req, res) => {

        let favData = {
            itemID: req.body['itemID'],
            userID: req.body['userID']
        }

        favourites.remove(databaseData, favData, function (err, result) {

            if (err) {
                res.status(err.code); 
                res.end(JSON.stringify(err)) 
                return;
            }
            res.end(JSON.stringify({ message: "favourites removed successfully" })); // respone with message for notificaiton item was removed
        })
    });


};