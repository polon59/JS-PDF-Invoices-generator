const ServicesDAO = require('./ServicesDAO');

class InvoicesDAO{

    constructor(connection,messageLog){
        this.messageLog = messageLog;
        this.connection = connection;
        this.servicesDAO = new ServicesDAO(connection);
    }

    // http://localhost:8000/myAccount/invoices/1 OR 1=1

    deleteInvoice(id){
        return new Promise((resolve, reject)=>{
            this.connection.query(`DELETE FROM invoices WHERE id = ?`,[id], (err, result)=>{                                               
                if(err){
                    this.messageLog.logInvoicesInfo(err,"DELETE", id);
                    return reject(err);
                }
                this.messageLog.logInvoicesInfo('ok',"DELETE",id);
                resolve();
            });
        })
        
    }

    getRecordsFromInvoices(){
        return new Promise((resolve,reject)=>{
            this.connection.query("SELECT * FROM invoices", (err, result)=>{  
                if(err){
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    getAllInvoices(){
        return new Promise((resolve, reject)=>{
            this.getRecordsFromInvoices()
            .then((invoices)=>{
                this.servicesDAO.assignServicesToInvoices(invoices)
                .then((invoices)=>{
                    this.messageLog.logInvoicesInfo('ok',"RETURN ALL",'*');
                    resolve(invoices);
                })
                .catch(err=>{
                    reject(err);
                })
            })
            .catch(err=>{
                this.messageLog.logInvoicesInfo(err,"RETURN ALL",'*');
                reject(err)
            });
        });
    }

    addNewInvoice(request){
        return new Promise((resolve,reject)=>{
            const insertSQL = this.prepareInsertQuery(request);
            this.connection.query(insertSQL, (err,result)=> {
                if (err){
                    this.messageLog.logInvoicesInfo(err,"ADD NEW INVOICE",'-');
                    return reject(err);
                }
                const {services} = request.body;
                this.servicesDAO.addNewInvoiceServices(services,result.insertId)
                .then(() =>{
                    this.messageLog.logInvoicesInfo('ok',"ADD NEW INVOICE",result.insertId);
                    resolve(result.insertId);
                })
                .catch(err=>{
                    this.messageLog.logInvoicesInfo(err,"ADD NEW INVOICE (services)",result.insertId);
                })
            });
        });
    }

    updateInvoice(request){
        const {id,services} = request.body;
        return new Promise((resolve,reject)=>{
            this.servicesDAO.deleteAllInvoiceServices(id)
            .then(()=>{
                this.servicesDAO.addNewInvoiceServices(services,id)
                .then(()=>{
                    this.updateExistingInvoice(request)
                    .then(()=>{
                        this.messageLog.logInvoicesInfo('ok',"UPDATE INVOICE",id);
                        resolve();
                    })
                    .catch(err=>{
                        this.messageLog.logInvoicesInfo(err,"UPDATE INVOICE - update invoice data",id);
                    });
                })
                .catch(err =>{
                    this.messageLog.logInvoicesInfo(err,"UPDATE INVOICE - update services",id);
                })
            }).catch(err=>{
                this.messageLog.logInvoicesInfo(err,"UPDATE INVOICE - delete old services",id);
                reject(err);
            })
        })
    }

    prepareInsertQuery(request){
        const {id,title,date,billFrom,billTo,subTotal,salesTax,salesTaxVal,totalDue} = request.body;
        return `INSERT INTO invoices (title, date, billTo, billFrom, subTotal, salesTax, salesTaxVal, totalDue)
        VALUES ("${title}", '${date}', "${billTo}", "${billFrom}", ${subTotal}, ${salesTax}, ${salesTaxVal}, ${totalDue});`;
    }

    prepareUpdateQuery(request){
        const {id,title,date,billFrom,billTo,subTotal,salesTax,salesTaxVal,totalDue} = request.body;
        return `REPLACE INTO invoices (id, title, date, billTo, billFrom, subTotal, salesTax, salesTaxVal, totalDue)
            VALUES (${id},"${title}", '${date}', "${billTo}", "${billFrom}", ${subTotal}, ${salesTax}, ${salesTaxVal}, ${totalDue});`;
    }

    updateExistingInvoice(request){
        const updateSQL = this.prepareUpdateQuery(request);
        return new Promise((resolve,reject)=>{
            this.connection.query(updateSQL, (err)=> {
                if (err){
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

}
module.exports = InvoicesDAO;