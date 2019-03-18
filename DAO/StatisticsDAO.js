class StatisticsDAO{
    
    constructor(connection){
        this.connection = connection;
    }

    getNumberOfServicesByMonthInYear(year){
        const sql = 
        `SELECT  MONTH(date) as month, COUNT(*) as doneServices FROM invoices 
        JOIN services ON invoices.id = services.invoiceID
        WHERE YEAR(date) = ${year}
        GROUP BY month;`;
        connection.query(sql, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        //   returned object:
        // [ RowDataPacket { month: 3, doneServices: 7 },
        //     RowDataPacket { month: 6, doneServices: 1 },
        //     RowDataPacket { month: 12, doneServices: 4 } ]
          
        });
    }

    getNumberOfInvoicesByMonthInYear(year){
        const sql = 
        `SELECT MONTH(date) as month, COUNT(*) as createdInvoices FROM invoices
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