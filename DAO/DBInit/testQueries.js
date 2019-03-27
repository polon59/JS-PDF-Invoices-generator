var DbConn = require('./../dbConn.js');
var dataBaseConn = new DbConn();
var connection = dataBaseConn.connection;

runQuery();
// SELECT MONTH(date) as month, COUNT(*) as doneServices
function runQuery() {
    const year = 2019;
    const sql =`SELECT * FROM invoices;`;


    connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      console.log(JSON.stringify(result))
      process.exit();
    });
  }