const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// set static path
// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var invoices = [
    {
        id: 1,
        title: 'Invoice 1/2019',
        billFrom: 'John Doe',
        billTo: 'some company'
    },
    {
        id: 2,
        title: 'Invoice 2/2019',
        billFrom: 'some other company',
        billTo: 'another company'
    },
    {
        id: 3,
        title: 'Invoice 3/2019',
        billFrom: 'and another',
        billTo: 'to another'
    }
];


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


app.get('/myAccount/invoices', (req, res) =>{
    res.render("invoices", {
        invoices
    });
});


// app.get('/myAccount/invoices/addInvoice'){

// }



app.post('/users/add', (req, res) =>{
    const newUser = {
        firstname : req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    };

    console.log(newUser);
});


app.listen(port, () => {console.log(`listening on port ${port}`)});