const ServicesDAO = require('./ServicesDAO');

class InvoicesDAO{

    constructor(connection){
        this.connection = connection;
        this.servicesDAO = new ServicesDAO(connection);
    }

    deleteInvoice(id){
        const sql = `DELETE FROM invoices WHERE id = ${id}`;
        this.connection.query(sql, (err, result)=>{                                                
            if(err){
                throw err;
                return;
            }
            console.log(`[SQL INFO] deleted record from INVOICES table (ID:${id})`);
        });
    }

    getRecordsFromInvoices(){
        return new Promise((resolve,reject)=>{
            this.connection.query("SELECT * FROM invoices", (err, result)=>{                                                
                if(err){
                    reject(new Error(err.message));
                    return;
                }
                resolve(result);
                console.log("[SQL INFO] returned all records from INVOICES table");
            });
        });
    }

    getAllInvoices(){
        return new Promise((resolve, reject)=>{
            this.getRecordsFromInvoices().then((invoices)=>{
                this.servicesDAO.assignServicesToInvoices(invoices)
                .then((invoices)=>{
                    resolve(invoices);
                })
                .catch(err=>{
                    console.log(err.message);
                    reject(err);
                })
            });
        });
    }

    prepareInsertQuery(request){
        const {id,title,date,billFrom,billTo,subTotal,salesTax,salesTaxVal,totalDue} = request.body;
        return `INSERT INTO invoices (title, date, billTo, billFrom, subTotal, salesTax, salesTaxVal, totalDue)
            VALUES ("${title}", '${date}', "${billTo}", "${billFrom}", ${subTotal}, ${salesTax}, ${salesTaxVal}, ${totalDue});`;
    }

    addNewInvoice(request){
        const insertSQL = this.prepareInsertQuery(request);
        return new Promise((resolve,reject)=>{
            this.connection.query(insertSQL, (err,result)=> {
                if (err){reject(new Error(err.message));return;}
                const assignedId = result.insertId;
                const {services} = request.body;
                if (services.length > 0) {
                    this.servicesDAO.addNewInvoiceServices(services,assignedId).then(() =>{
                        resolve(assignedId);
                    })
                } else {resolve(assignedId);}
                console.log(`[SQL INFO] inserted new record to INVOICES table (NEW ID:${assignedId})`);
            });
        });
    }

    getLastInsertedRecordID(){
        return new Promise((resolve,reject) =>{
            this.connection.query("SELECT LAST_INSERT_ID();", (err, result)=>{
                if (err){
                    reject(new Error(err.message));
                    return;
                }
                let assignedID = result[0];
                console.log(`[SQL INFO] inserted new record to INVOICES table (NEW ID:${assignedID['LAST_INSERT_ID()']})`);
                resolve(assignedID);
            });
        });
    }

    updateInvoice(request){
        const {id,services} = request.body;
        this.servicesDAO.deleteAllInvoiceServices(id).then(()=>{
            this.servicesDAO.addNewInvoiceServices(services,id).then(()=>{
                this.updateExistingInvoice(request).then(()=>{
                    console.log(`[SQL INFO] updated properties of invoice (ID:${id})`);
                });
            })
            .catch(err =>{
                console.log(err.message);
            })
        })
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
                    reject(new Error(err.message));
                    return;
                }
                resolve();
            });
        });
    }

}
module.exports = InvoicesDAO;