class DbConn{
  
    constructor(){
      this.mysql = require('mysql');
      this.host = "localhostr";
      this.user = "root";
      this.password = "mysQLpassword";
      this.database = "mydb";
    }
  
    createDBConnection(){
      const {host,user,password,database} = this;
      const connection = this.mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
      });
      if (this.isConnectionSuccessful(connection)){
        return connection;
      }
      return null;
    }


    isConnectionSuccessful(connection){
      try {
        connection.createConnection();
      } catch (error) {
        console.log(`[DB Connection]: \x1b[41m ERROR \x1b[0m connecting to database. 
        Authentication failed or database does not exist.
        Check host, user, password and DB data in \x1b[4m ./DAO/DBConn.js \x1b[0m file`);
        return false;
      }

      console.log("[DB Connection]: successfuly connected to database");
      return true;
    }
  
  }
  
  module.exports = DbConn;
