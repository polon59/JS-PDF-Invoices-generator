class DbConn{
  
    constructor(){
      this.mysql = require('mysql');
      this.connection = this.createDBConnection();
    }
  
    createDBConnection(){
      let connection = this.mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "mysQLpassword",
        database: "mydb"
      });
      console.log("Succesfully connected to database");
      return connection;
    }
  
  }
  
  module.exports = DbConn;
