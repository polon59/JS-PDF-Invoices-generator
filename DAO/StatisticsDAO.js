class StatisticsDAO{
    
    constructor(connection){
        this.connection = connection;
    }


    getNumberOfInvoicesByMonthInYear(year){
        const sql = 
        `SELECT MONTH(date) as month, COUNT(*) as createdInvoices
        FROM invoices
        WHERE YEAR(date) = ${year}
        GROUP BY month;`;
        connection.query(sql, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        //   returned object:
        //   [ RowDataPacket { month: 'June', createdInvoices: 1 },
        //   RowDataPacket { month: 'March', createdInvoices: 2 } ]
        });
    }
}

module.exports = StatisticsDAO;