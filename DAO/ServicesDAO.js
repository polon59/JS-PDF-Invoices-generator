const mysql=require('mysql');

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

    addNewInvoiceServices(request,assignedID){
        const {services} = request.body;
        const sql = this.prepareInsertQuery(services,assignedID);
        console.log(sql);
    }
}

module.exports = ServicesDAO;