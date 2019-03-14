var DbConn = require('./../dbConn.js');

var dataBaseConn = new DbConn();
var connection = dataBaseConn.connection;

createTables();

function createTables() {
    // createUsersTable();
    createInvoicesTable();
    createServicesTable();
}

// function createUsersTable(){
//     let sql = `CREATE TABLE users (
//         id SERIAL PRIMARY KEY,
//         login VARCHAR(30) UNIQUE,
//         password VARCHAR(30)
//     );`;
//     connection.query(sql, function (err, result) {
//       if (err) {throw err}
//     });
//     console.log("Users Table Created");
// }


function createInvoicesTable(){
    let sql = `CREATE TABLE invoices (
        id DOUBLE PRIMARY KEY,
        title TEXT,
        invDate DATE,
        billTo TEXT,
        billFrom TEXT,
        subTotal FLOAT,
        salesTax FLOAT,
        salesTaxVal FLOAT,
        totalDue FLOAT
    );`;
    connection.query(sql, function (err, result) {
      if (err) {throw err}
    });
    console.log("Invoices Table Created");
}

function createServicesTable(){
    let sql = `CREATE TABLE services (
        id SERIAL PRIMARY KEY,
        userID INTEGER REFERENCES invoices(id),
        description TEXT,
        quantity INTEGER,
        tax INTEGER
    );`;
    connection.query(sql, function (err, result) {
      if (err) {throw err}
    });
    console.log("Services Table Created");
}

