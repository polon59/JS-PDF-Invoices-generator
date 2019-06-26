const express = require('express');
const bodyParser = require('body-parser');
const MessageDisplay = require('./common/MessageDisplay');
const InvoicesController = require('./InvoicesController.js');
const AccountController = require('./AccountController.js');
const StatisticsController = require('./StatisticsController');
const DbCon = require('./DAO/dbConn');
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const messageLog = new MessageDisplay();
const dataBaseConn = new DbCon(messageLog);

dataBaseConn.createDBConnection().then((connection)=>{
   if (connection == null) {
       process.exit();
   }
   var invoicesController = new InvoicesController(app,connection,messageLog);
   var accountController = new AccountController(app);
   var statisticsController = new StatisticsController(app,connection);
   allowCORS(app);
   invoicesController.setRoutes();
   accountController.setRoutes();
   statisticsController.setRoutes();
   
   app.listen(port, () => messageLog.displayServerListeningInfo(port));
});


function allowCORS(application){
    application.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
        res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Accept');
        next();
      });
}
