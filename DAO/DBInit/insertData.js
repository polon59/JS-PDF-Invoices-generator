var DbConn = require('./../dbConn.js');
var dataBaseConn = new DbConn();
var connection = dataBaseConn.connection;

insertData();

function insertData(){
  insertInvoices();
}

function insertInvoices() {
    let sql = `INSERT INTO invoices (id, title, date, billTo, billFrom, subTotal, salesTax, salesTaxVal, totalDue)
        VALUES (0.11987759939440279, 'invoice 9923/22', '2017-12-23', "Radoslaw Turkuc Podjadek", 'BillFrom company', 5000, 15.5, 400.34, 5400.34);`;
    connection.query(sql, function (err, result) {
      if (err) {throw err}
    });
    console.log("Invoices records added");
}