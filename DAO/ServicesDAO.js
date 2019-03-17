const async=require('async');

class ServicesDAO{

    constructor(connection){
        this.connection = connection;
    }
    
    prepareInsertQuery(services,invoiceID){
        const servicesNumber = services.length;
        const queryBegin = "INSERT INTO services (invoiceID, description, quantity, unitPrice, total) VALUES";
        const queryValues = this.prepareQueryInsertValues(services,invoiceID,servicesNumber);
        const fullQuery = queryBegin + queryValues;
        return fullQuery;
    }

    prepareQueryInsertValues(services,invoiceID,servicesNumber){
        const queryValues = services.map((service,i) =>{
            const {id,description,quantity,unitPrice,total} = service;
            if (servicesNumber === i + 1) {
                return  `(${invoiceID}, '${description}', ${quantity}, ${unitPrice}, ${total});`;
            }else {
                return  `(${invoiceID}, '${description}', ${quantity}, ${unitPrice}, ${total})`;
            }
        });
        return queryValues;
    }

    deleteAllInvoiceServices(invoiceID){
        return new Promise((resolve,reject)=>{
            const sql = `DELETE FROM services WHERE invoiceID=${invoiceID};`;
            this.connection.query(sql, (err)=> {
                if (err){reject(new Error(err.message));}
                else{resolve();}
            });
        });
    }

    adjustDate(date){
        let day = date.getDate();
        if(day < 10){day = `0${day}`;}
        let month = date.getMonth();
        if (month <10){month = `0${month}`;}
        let year = date.getFullYear();
        let adjustedDate = `${month}-${day}-${year}`;
        return adjustedDate;
    }

    assignServicesToInvoices(invoices){
        return new Promise((resolve,reject)=>{
            async.forEachOf(invoices,(invoice,key,callback)=>{
                this.connection.query(`SELECT * FROM services WHERE invoiceID=${invoice.id}`, (err,result)=> {
                    if (err){
                        reject(new Error(err.message));
                    }else{
                        invoice["services"] = result;
                        let date = invoice.date;
                        invoice.date = this.adjustDate(date);
                    }
                    callback();
                });
            },()=>{resolve(invoices);});
        });
    }

    addNewInvoiceServices(services,assignedID){
        console.log("[SQL INFO] added New Invoice Services SERVICES:")
        console.log(services);
        const sql = this.prepareInsertQuery(services,assignedID);
        return new Promise((resolve,reject)=>{
            this.connection.query(sql, (err)=> {
                if (err){
                    reject(new Error(err.message));
                }else{resolve();}
            });
        });
    }
}

module.exports = ServicesDAO;