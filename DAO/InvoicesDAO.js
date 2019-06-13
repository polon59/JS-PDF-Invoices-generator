const ServicesDAO = require('./ServicesDAO');

class InvoicesDAO{

    constructor(connection,messageLog){
        this.messageLog = messageLog;
        this.connection = connection;
        this.servicesDAO = new ServicesDAO(connection);
    }

    deleteInvoice(id){
        this.connection.query(`DELETE FROM invoices WHERE id = ${id}`, (err, result)=>{                                               
            if(err){throw err;}
            this.messageLog.logInvoicesInfo('ok',"DELETE",id);
        });
    }

    getRecordsFromInvoices(){
        return new Promise((resolve,reject)=>{
            this.connection.query("SELECT * FROM invoices", (err, result)=>{                                            
                if(err){reject(err);}
                resolve(result);
                console.log("[SQL INFO] returned all records from INVOICES table");
            });
        });
    }

    getAllInvoices(){
        return new Promise((resolve, reject)=>{
            this.getRecordsFromInvoices()
            .then((invoices)=>{
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

    addNewInvoice(request){
        return new Promise((resolve,reject)=>{
            const insertSQL = this.prepareInsertQuery(request);
            this.connection.query(insertSQL, (err,result)=> {
                if (err){reject(err);}
                else{
                    const {services} = request.body;
                    this.servicesDAO.addNewInvoiceServices(services,result.insertId)
                    .then(() =>{
                        resolve(result.insertId);
                    }) 
                }
                console.log(`[SQL INFO] inserted new record to INVOICES table (NEW ID:${result.insertId})`);
            });
        });
    }

    updateInvoice(request){
        const {id,services} = request.body;
        this.servicesDAO.deleteAllInvoiceServices(id)
        .then(()=>{
            this.servicesDAO.addNewInvoiceServices(services,id)
            .then(()=>{
                this.updateExistingInvoice(request)
                .then(()=>{
                    console.log(`[SQL INFO] updated properties of invoice (ID:${id})`);
                });
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