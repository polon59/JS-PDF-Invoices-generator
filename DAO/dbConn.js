class DbConn{
  
    constructor(messageLog){
      this.messageLog = messageLog;
      this.mysql = require('mysql');
      this.host = "localhost";
      this.user = "root";
      this.password = "mysQLpassword";
      this.database = "mydb";
    }
  
    createDBConnection(){
      const {host,user,password,database} = this;
      let connection = this.mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
      });
      return this.isConnectionSuccessful(connection);
    }


    isConnectionSuccessful(connection){
      return new Promise((resolve,reject)=>{
        connection.connect((error)=>{
          if (error){
            this.messageLog.displayDBConnInfo(error);
            resolve(null);
          }else{
            this.messageLog.displayDBConnInfo('success');
            resolve(connection);
          }
        })
      })
    }
  
  }
  
  module.exports = DbConn;
