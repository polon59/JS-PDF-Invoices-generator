const mysql=require('mysql');
const async=require('async');

class ServicesDAO{
    constructor(connection){
          this.connection = connection;
    }

    prepareQueryInsertValues(services,invoiceID,servicesNumber){
        const queryValues = services.map((service,i) =>{
            const {id,description,quantity,unitPrice,total} = service;
            if (servicesNumber === i + 1) {
                return  `("${id}", ${invoiceID}, '${description}', ${quantity}, ${unitPrice}, ${total});`;
            }else {
                return  `("${id}", ${invoiceID}, '${description}', ${quantity}, ${unitPrice}, ${total})`;
            }
        });
        return queryValues;
    }

    prepareInsertQuery(services,assignedID){
        const servicesNumber = services.length;
        const invoiceID = assignedID['LAST_INSERT_ID()'];
        const queryBegin = "REPLACE INTO services (id, invoiceID, description, quantity, unitPrice, total) VALUES";
        const queryValues = this.prepareQueryInsertValues(services,invoiceID,servicesNumber);
        const fullQuery = queryBegin + queryValues;
        return fullQuery;
    }

    assignServicesToInvoices(invoices){
        return new Promise((resolve,reject)=>{
            async.forEachOf(invoices,(invoice,key,callback)=>{
                this.connection.query(`SELECT * FROM services WHERE invoiceID=${invoice.id}`, (err,result)=> {
                    if (err){
                        reject(new Error(err.message));
                    }else{
                        invoice["services"] = result;
                    }
                    callback();
                });
            },()=>{resolve(invoices);});
        });
    }

    addNewInvoiceServices(request,assignedID){
        const {services} = request.body;
        const sql = this.prepareInsertQuery(services,assignedID);

        return new Promise((resolve,reject)=>{
            this.connection.query(sql, (err)=> {
                if (err){
                    reject(new Error(err.message));
                }else{resolve();}
            });
        });
        console.log(sql);
    }
}

module.exports = ServicesDAO;