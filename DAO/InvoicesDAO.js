const DbCon = require('./dbConn');
const mysql=require('mysql');

class InvoicesDAO{
    constructor(){
        this.invoices = [
            {id: 1, title: "invoice 11445", date:"2017-02-14", billTo:"Mariusz Pudzianowski", billFrom:"My company", subTotal:1220, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:1, description:"descr", quantity:10, unitPrice:1200}, {id:2, description:"descr", quantity:1, unitPrice:100}]},
            {id: 2, title: "invoice 992/1012", date:"2016-04-10", billTo:"Barbara Karwasz-Barabasz", billFrom:"My company 2", subTotal:0, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:3, description:"descr", quantity:10, unitPrice:1200}, {id:4, description:"descr", quantity:10, unitPrice:120}]},
            {id: 3, title: "invoice 445/6", date:"2017-02-11", billTo:"Janusz Nocnik", billFrom:"My company 3", subTotal:1340, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:5, description:"descr", quantity:1, unitPrice:12050}]},
            {id: 4, title: "invoice 9923/22", date:"2017-12-23", billTo:"Radosław Turkuć-Podjadek", billFrom:"My company 4", subTotal:5001.45, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:6, description:"descr", quantity:5, unitPrice:80}, {id:7, description:"descr", quantity:2, unitPrice:1705}, {id:8, description:"descr", quantity:7, unitPrice:1200}]},
            {id: 5, title: "invoice 223/5", date:"2017-10-09", billTo:"Joanna Drapieżna", billFrom:"My company 5", subTotal:0, salesTax:120, salesTaxVal:0, totalDue:0, services:[{id:9, description:"descr", quantity:10, unitPrice:1200}, {id:10, description:"descr", quantity:1, unitPrice:11200},{id:11, description:"descr", quantity:10, unitPrice:1200}, {id:12, description:"descr", quantity:5, unitPrice:10}]}
          ];
          this.dataBaseConn = new DbCon();
          this.connection = this.dataBaseConn.connection;
    }

    getAllInvoices(){
        return new Promise((resolve, reject)=>{
            this.connection.query(
                "SELECT * FROM invoices", 
                function(err, result){                                                
                    if(result === undefined){
                        reject(new Error("Error result is undefined"));
                    }else{
                        resolve(result);
                        console.log("[SQL INFO] returned all records from INVOICES table")
                    }
                }
            )}
        );
    }

    prepareInsertQuery(request){
        const {id,title,date,billFrom,billTo,subTotal,salesTax,salesTaxVal,totalDue,services} = request.body;
        return `INSERT INTO invoices (title, date, billTo, billFrom, subTotal, salesTax, salesTaxVal, totalDue)
            VALUES ("${title}", '${date}', "${billTo}", "${billFrom}", ${subTotal}, ${salesTax}, ${salesTaxVal}, ${totalDue});`;
    }

    addNewInvoice(request){
        const insertSQL = this.prepareInsertQuery(request);
        return new Promise((resolve,reject)=>{
            this.connection.query(insertSQL, (err)=> {
                if (err){
                    reject(new Error(err.message));
                }
                this.getLastInsertedRecordID().then(assignedID =>{resolve(assignedID)});
            });
        });
    }

    getLastInsertedRecordID(){
        return new Promise((resolve,reject) =>{
            this.connection.query("SELECT LAST_INSERT_ID();", (err, result)=>{
                if (err){
                    reject(new Error(err.message));
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
            if(err){throw err;}
            else{console.log(`[SQL INFO] deleted record from INVOICES table (ID:${id})`)}
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