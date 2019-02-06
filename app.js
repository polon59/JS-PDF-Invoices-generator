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

const users = [
    {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'johnDoe@gmail.com'
    },
    {
        id: 2,
        firstname: 'Jill',
        lastname: 'Hub',
        email: 'jj@gmail.com'
    },
    {
        id: 3,
        firstname: 'Jack',
        lastname: 'Doe',
        email: 'johnjackDoe@gmail.com'
    }
]


app.get('/', (req, res) =>{
    res.render("index", {
        users
    });
});


app.post('/users/add', (req, res) =>{
    console.log("form submitted");
});


app.listen(port, () => {console.log(`listening on port ${port}`)});