const db = require('../../database')
const auth = require('basic-auth');

module.exports.loginUser = function (conData, request, callback) { // function retrieve database data and request

    if (request.headers === undefined || request.headers.authorization === undefined) {  //checks if headers object or the values are undefined

        const err = { //Retruns message header missing  to front-end
            message: 'Authorization header missing',  
            code: 401
        };
        callback(err);
        return;
    }

    const loginData = auth(request); // saves encrypted login detail to "login"

    if (loginData === undefined || loginData.name === undefined || loginData.pass === undefined) {  //checks if headers object or the values are undefined


        const err = { //return message login details missing to front-end
            message: 'missing username or password', 
            code: 401
        };
        callback(err);
        return;
    }

    db.connect(conData, function (err, data) { //connection made to the database

        if (err) { //return error 500 if there were problems connecting to database
            err.code = 500;
            callback(err);
            return;
        }

        data.query('SELECT userID,role, first_name FROM user WHERE username="' + loginData.name + '" AND password= "' + loginData.pass + '"', function (err, result) { //where the username and password equal in the user table return the result

            if (err) {  //return error 500 if there were problems connecting to database
                err.code = 500;
                callback(err);
                return;
            }


            if (result && result.length > 0) { //check if return value cantains any value 
                callback(null, { userID: result[0].userID, role: result[0].role, firstName: result[0].first_name }); //send back results
            }
            else {
                const err = { //return message innorrect login details to front-end
                    message: 'wrong username or password',
                    code: 401
                };
                callback(err);
            }


        });
    });

}


