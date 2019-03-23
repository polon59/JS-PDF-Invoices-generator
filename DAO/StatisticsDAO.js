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

    getAvailableStatisticsYears(){
        return new Promise((resolve,reject)=>{
            const sql =`SELECT DISTINCT YEAR(date) as year FROM invoices ORDER BY year DESC;`;
            this.getResultsFromDB(sql).then(result=>{
                resolve(result)
            }).catch(err=>{reject(err)})
        })
        
    }

    getAllStatistics(year){
        return new Promise((resolve,reject)=>{
            Promise.all(
            [this.getNumberOfServicesByMonthInYear(year), 
            this.getNumberOfInvoicesByMonthInYear(year),
            this.getIncomeByMonthInYearWithoutTax(year),
            this.getIncomeByMonthInYearWithTax(year),
            this.getFiveMostLucrativeServicesInYear(year),
            this.getFiveBestCustomersInYear(year)])
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
        `SELECT  MONTH(date) as month, SUM(quantity) as doneServices FROM invoices 
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
    }

    getFiveMostLucrativeServicesInYear(year){
        const sql = 
        `SELECT description as service_name, ROUND(SUM(total),2) as service_income FROM services 
        JOIN invoices ON invoices.id = services.invoiceID
        WHERE YEAR(date) = ${year}
        GROUP BY description
        ORDER BY service_income DESC
        LIMIT 5;`;
        return new Promise((resolve,reject)=>{
            this.getResultsFromDB(sql)
            .then((result)=>{
                resolve({"Most lucrative Services":result});
            })
            .catch(err=>{
                console.log(err.message);
                reject(err);
            })
        })  
    }

    getFiveBestCustomersInYear(year){
        const sql = 
        `SELECT billTo as Company, ROUND(SUM(total),2) as Profit FROM services 
        JOIN invoices ON invoices.id = services.invoiceID
        WHERE YEAR(date) = ${year}
        GROUP BY Company
        ORDER BY Profit DESC
        LIMIT 5;`;
        return new Promise((resolve,reject)=>{
            this.getResultsFromDB(sql)
            .then((result)=>{
                resolve({"Best customers":result});
            })
            .catch(err=>{
                console.log(err.message);
                reject(err);
            })
        })  
    }
}

module.exports = StatisticsDAO;