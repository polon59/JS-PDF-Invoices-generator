const express = require('express');
const bodyParser = require('body-parser');
const InvoicesController = require('./InvoicesController.js');
const AccountController = require('./AccountController.js');
const StatisticsController = require('./StatisticsController');
const DbCon = require('./DAO/dbConn');
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const dataBaseConn = new DbCon();
const connection = dataBaseConn.connection;

var invoicesController = new InvoicesController(app,connection);
var accountController = new AccountController(app);
var statisticsController = new StatisticsController(app,connection);
invoicesController.setRoutes();
accountController.setRoutes();

app.listen(port, () => {console.log(`*** server listening on port ${port} ***`)});