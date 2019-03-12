const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const InvoicesController = require('./InvoicesController.js');
const AccountController = require('./AccountController.js');
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var invoicesController = new InvoicesController(app);
var accountController = new AccountController(app);
console.log("[INFO] Starting server routes");
invoicesController.setRoutes();
accountController.setRoutes();
console.log("[INFO] Route initializing completed");


app.get('/', (req, res) =>{
    res.render("index");
});

app.listen(port, () => {console.log(`*** server listening on port ${port} ***`)});