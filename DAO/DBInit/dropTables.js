var DbConn = require('./../dbConn.js');

var dataBaseConn = new DbConn();
var connection = dataBaseConn.connection;

dropTables();

function dropTables(){
  dropUsers();
  dropServices();
  dropInvoices();
}


function dropUsers(){
  let sql = "DROP TABLE IF EXISTS users;";
  connection.query(sql, function (err, result) {
    if (err) {throw err}
  });
  console.log("Table Users Dropped");
}

function dropInvoices(){
  let sql = "DROP TABLE IF EXISTS invoices;";
  connection.query(sql, function (err, result) {
    if (err) {throw err}
  });
  console.log("Table Invoices Dropped");
}

function dropServices(){
  let sql = "DROP TABLE IF EXISTS services;";
  connection.query(sql, function (err, result) {
    if (err) {throw err}
  });
  console.log("Table Services Dropped");
}