var DbConn = require('./../dbConn.js');
var dataBaseConn = new DbConn();
var connection = dataBaseConn.connection;

insertData();

function insertData(){
  // insertInvoices();
  // displayInvoices();
  // replace();
  // displayServices();
  insertMonths();
}

function insertMonths(){
  let sql = `INSERT INTO months (no)
  VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12);`;
  connection.query(sql, function (err, result) {
  if (err) {throw err}
  });
  console.log("Months records added");
  }

function insertInvoices() {
    let sql = `INSERT INTO invoices (title, date, billTo, billFrom, subTotal, salesTax, salesTaxVal, totalDue)
        VALUES ("invoice title", '2017-01-18', "Radoslaw Turkuc Podjadek", "BillFrom company", 5000, 15.5, 400.34, 5400.34),
          ("inny", '2017-01-18', "Mariusz", "From", 2120, 10, 40.00, 100.00);`;
    connection.query(sql, function (err, result) {
      if (err) {throw err}
    });
    console.log("Invoices records added");
}


function replace() {
  let sql = `REPLACE INTO invoices(id, title, date, billTo, billFrom, subTotal, salesTax, salesTaxVal, totalDue)
  VALUES(0.44487759939440279, "inny", '2017-01-18', "Bill do", "Bill od", 220, 1.5, 4.34, 540.34);`;
  connection.query(sql, function (err, result) {
    if (err) {throw err}
  });
  console.log("Invoices records added");
}

function displayServices() {
  connection.query("SELECT * FROM services", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}

function displayInvoices() {
    connection.query("SELECT * FROM invoices", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
}