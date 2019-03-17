const DbCon = require('./dbConn');
const mysql=require('mysql');
const ServicesDAO = require('./ServicesDAO');

class InvoicesDAO{
    constructor(){
          this.dataBaseConn = new DbCon();
          this.connection = this.dataBaseConn.connection;
          this.servicesDAO = new ServicesDAO(this.connection);
    }


    getRecordsFromInvoices(){
        return new Promise((resolve,reject)=>{
            this.connection.query(
                "SELECT * FROM invoices", 
                function(err, result){                                                
                    if(result === undefined){
                        reject(new Error("Error result is undefined"));
                        return;
                    }
                    resolve(result);
                    console.log("[SQL INFO] returned all records from INVOICES table")
                });
        });
    }

    getAllInvoices(){
        return new Promise((resolve, reject)=>{
                this.getRecordsFromInvoices().then((invoices)=>{
                    this.servicesDAO.assignServicesToInvoices(invoices)
                    .then((invoices)=>{
                        console.log("=========================RESULT IN INVOICES DAO");
                        console.log(invoices);
                        resolve(invoices);
                    })
                    .catch(err=>{
                        console.log("ERROR IN INV DAO (getAllInvoices)")
                        console.log(err.message);
                        reject(result);
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
            this.connection.query(insertSQL, (err)=> {
                if (err){
                    reject(new Error(err.message));
                    return;
                }
                this.getLastInsertedRecordID().then(assignedID =>{
                    this.servicesDAO.addNewInvoiceServices(request,assignedID).then(() =>{
                        resolve(assignedID);
                    });
                });
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

    updateInvoice(id, updatedInvoice){
        const invoiceToUpdateIndex = this.findIndexInArrayByID(id);
        this.invoices[invoiceToUpdateIndex] = updatedInvoice;
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

    findIndexInArrayByID(givenID){
        let foundIndex;
        for (let index = 0; index < this.invoices.length; index++) {
            if (this.invoices[index].id == givenID) {
                foundIndex = index;
            }
        }
        return foundIndex;
    }

}

module.exports = InvoicesDAO;