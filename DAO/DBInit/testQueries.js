var DbConn = require('./../dbConn.js');
var dataBaseConn = new DbConn();
var connection = dataBaseConn.connection;

runQuery();
// SELECT MONTH(date) as month, COUNT(*) as doneServices
function runQuery() {
    const year = 2019;
    const sql =`SELECT billTo as Company, ROUND(SUM(total),2) as Profit FROM services 
        JOIN invoices ON invoices.id = services.invoiceID
        WHERE YEAR(date) = ${year}
        GROUP BY Company
        ORDER BY Profit DESC
        LIMIT 5;`;


    connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      process.exit();
    });
  }