class StatisticsDAO{
    
    constructor(connection){
        this.connection = connection;
    }


    getResultsFromDB(sql){
        return new Promise((resolve,reject)=>{
            this.connection.query(sql,(err,result)=>{
                if(err){
                    reject(new Error(err.message));
                    return;
                }
                resolve(result);
            })
        })
    }

    getAllStatistics(year){
        return new Promise((resolve,reject)=>{
            Promise.all(
            [this.getNumberOfServicesByMonthInYear(year), 
            this.getNumberOfInvoicesByMonthInYear(year),
            this.getIncomeByMonthInYearWithoutTax(year),
            this.getIncomeByMonthInYearWithTax(year)])
            .then((values)=> {
                resolve(values);
            })
            .catch(err=>{
                reject(new Error(err.message));
            })
        })
    }

    getNumberOfServicesByMonthInYear(year){
        const sql = 
        `SELECT  MONTH(date) as month, COUNT(*) as doneServices FROM invoices 
        JOIN services ON invoices.id = services.invoiceID
        WHERE YEAR(date) = ${year}
        GROUP BY month;`;
        return new Promise((resolve,reject)=>{
            this.getResultsFromDB(sql)
            .then((result)=>{
                console.log(`[SQL INFO] returned statistics from ALL tables for year=${year}`);
                resolve({"Done services":result});
            })
            .catch(err=>{
                console.log(err.message);
                reject(err);
            })
        })
        //   returned object:
        // [ RowDataPacket { month: 3, doneServices: 7 },
        //     RowDataPacket { month: 6, doneServices: 1 },
        //     RowDataPacket { month: 12, doneServices: 4 } ]
    }

    getNumberOfInvoicesByMonthInYear(year){
        const sql = 
        `SELECT MONTH(date) as month, COUNT(*) as createdInvoices FROM invoices
        WHERE YEAR(date) = ${year}
        GROUP BY month;`;
        return new Promise((resolve,reject)=>{
            this.getResultsFromDB(sql)
            .then((result)=>{
                resolve({"Created invoices":result});
            })
            .catch(err=>{
                console.log(err.message);
                reject(err);
            })
        })
        //   returned object:
        //   [ RowDataPacket { month: '6', createdInvoices: 1 },
        //   RowDataPacket { month: '3', createdInvoices: 2 } ]
    }

    getIncomeByMonthInYearWithoutTax(year){
        const sql = 
        `SELECT  MONTH(date) as month, ROUND(SUM(subTotal), 2) as income
        FROM invoices
        WHERE YEAR(date) = ${year}
        GROUP BY month;`;
        return new Promise((resolve,reject)=>{
            this.getResultsFromDB(sql)
            .then((result)=>{
                resolve({"Income net":result});
            })
            .catch(err=>{
                console.log(err.message);
                reject(err);
            })
        })
        //   returned object:
        // [ RowDataPacket { month: 3, income: 7279.41 },
        //     RowDataPacket { month: 6, income: 82 } ]          
    }

    getIncomeByMonthInYearWithTax(year){
        const sql = 
        `SELECT  MONTH(date) as month, ROUND(SUM(totalDue), 2) as income
        FROM invoices
        WHERE YEAR(date) = ${year}
        GROUP BY month;`;
        return new Promise((resolve,reject)=>{
            this.getResultsFromDB(sql)
            .then((result)=>{
                resolve({"Income gross":result});
            })
            .catch(err=>{
                console.log(err.message);
                reject(err);
            })
        })
        //   returned object:
        // [ RowDataPacket { month: 3, income: 7279.41 },
        //     RowDataPacket { month: 6, income: 82 } ]          
    }
}

module.exports = StatisticsDAO;