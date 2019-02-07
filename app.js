const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const InvoicesController = require('./InvoicesController.js');
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// set static path
// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var invoicesController = new InvoicesController(app);



app.get('/', (req, res) =>{
    res.render("index");
});


app.post('/myAccount', (req, res) =>{
    const login = req.body.login;

    console.log(`logged user password:${req.body.password} , login: ${login}`);

    res.render("myAccount", {
        login
    });
});





// app.post('/myAccount/invoices', (req,res) =>{
//     const newInvoice = {
//         id: invoices.length+1,
//         title: req.body.title,
//         billFrom: req.body.billFrom,
//         billTo: req.body.billTo
//     }

//     invoices.push(newInvoice);
    
//     res.render("invoices", {
//         invoices
//     });
// });


app.get('/myAccount/invoices/addInvoice', (req,res) =>{
    res.render("addInvoice");
});



app.listen(port, () => {console.log(`listening on port ${port}`)});