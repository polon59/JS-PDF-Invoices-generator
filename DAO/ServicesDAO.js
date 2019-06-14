const async=require('async');

class ServicesDAO{

    constructor(connection){
        this.connection = connection;
    }
    
    prepareInsertQuery(services,invoiceID){
        const queryValues = services.map((service,i) =>{
            const {id,description,quantity,unitPrice,total} = service;
            return `(${invoiceID}, '${description}', ${quantity}, ${unitPrice}, ${total})`;
        });
        return `INSERT INTO services (invoiceID, description, quantity, unitPrice, total) VALUES ${queryValues};`;
    }

    deleteAllInvoiceServices(invoiceID){
        return new Promise((resolve,reject)=>{
        this.connection.query(`DELETE FROM services WHERE invoiceID= ?;`,[invoiceID], (err)=> {
            if (err)reject(err);
            else{resolve();}
            });
        });
    }

    adjustDate(date){
        let day = date.getDate();
        if(day < 10){day = `0${day}`;}
        let month = date.getMonth()+1;
        if (month <10){month = `0${month}`;}
        let year = date.getFullYear();
        return`${year}-${month}-${day}`;
    }

    assignServicesToInvoices(invoices){
        return new Promise((resolve,reject)=>{
            async.forEachOf(invoices,(invoice,key,callback)=>{
                this.assignServicesToInvoice(invoice,callback);
            },()=>{resolve(invoices);});
        });
    }

    assignServicesToInvoice(invoice, callback){
        this.connection.query(`SELECT * FROM services WHERE invoiceID= ?`,[invoice.id], (err,result)=> {
            if (err){throw err;}
            else{
                invoice.services = result;
                let date = invoice.date;
                invoice.date = this.adjustDate(date);
            }
            callback();
        });
    }

    addNewInvoiceServices(services,assignedID){
        return new Promise((resolve,reject)=>{
        if (services.length > 0){
            const sql = this.prepareInsertQuery(services,assignedID);
            this.connection.query(sql, (err)=> {
                if (err){reject(err);}
                else{
                    console.log(services);
                    resolve();
                }
            });
        }else{resolve()}
        });  
    }
}

module.exports = ServicesDAO;