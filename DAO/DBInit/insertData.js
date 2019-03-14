var DbConn = require('./../dbConn.js');
var dataBaseConn = new DbConn();
var connection = dataBaseConn.connection;

insertData();

function insertData(){
  insertInvoices();
  displayInvoices();
  // replace();
  // displayInvoices();
}

function insertInvoices() {
    let sql = `INSERT INTO invoices (id, title, date, billTo, billFrom, subTotal, salesTax, salesTaxVal, totalDue)
        VALUES (0.11987759939440279, "invoice title", '2017-01-18', "Radoslaw Turkuc Podjadek", "BillFrom company", 5000, 15.5, 400.34, 5400.34),
          (0.44587759939440279, "inny", '2017-01-18', "Mariusz", "From", 2120, 10, 40.00, 100.00);`;
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

function displayInvoices() {
    connection.query("SELECT * FROM invoices", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
}