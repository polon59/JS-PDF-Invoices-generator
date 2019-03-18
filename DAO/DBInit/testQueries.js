var DbConn = require('./../dbConn.js');
var dataBaseConn = new DbConn();
var connection = dataBaseConn.connection;

runQuery();

function runQuery() {
    const sql = `SELECT * FROM services`;
    connection.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  }