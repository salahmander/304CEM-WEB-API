const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

app.use(bodyParser.json())
app.use(cors());
app.options('*', cors());
app.use(express.static('public'));

const databaseData = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'classifiedads'
};

const port = 8080;

routes.allRoutes(databaseData, app);

app.listen(port, err  => {
    if(err){
      console.error(err)
    }else{
      console.log(`Server running on port ${port}`);
    }
  })