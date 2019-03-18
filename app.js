const express = require('express');
const bodyParser = require('body-parser');
const InvoicesController = require('./InvoicesController.js');
const AccountController = require('./AccountController.js');
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var invoicesController = new InvoicesController(app);
var accountController = new AccountController(app);
invoicesController.setRoutes();
accountController.setRoutes();

app.listen(port, () => {console.log(`*** server listening on port ${port} ***`)});