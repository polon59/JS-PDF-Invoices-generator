var DbConn = require('./../dbConn.js');

var dataBaseConn = new DbConn();
var connection = dataBaseConn.connection;

createTables();

function createTables() {
    // createUsersTable();
    // createInvoicesTable();
    // createServicesTable();
    createMonthsTable();
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

function createMonthsTable(){
    let sql = `CREATE TABLE months (
        no INTEGER PRIMARY KEY
    );`;
    connection.query(sql, function (err, result) {
      if (err) {throw err}
    });
    console.log("MONTHS Table Created");
}


function createInvoicesTable(){
    let sql = `CREATE TABLE invoices (
        id SERIAL PRIMARY KEY,
        title TEXT,
        invDate DATE,
        billTo CHARACTER SET UTF8 COLLATE UTF8_UNICODE_CI,
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
        invoiceID INTEGER REFERENCES invoices(id),
        description TEXT,
        quantity INTEGER,
        unitPrice FLOAT,
        total FLOAT
    );`;
    connection.query(sql, function (err, result) {
      if (err) {throw err}
    });
    console.log("Services Table Created");
}

