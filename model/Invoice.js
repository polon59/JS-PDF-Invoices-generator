const Service = require('./Service.js');

class Invoice{

    constructor(id,title,date,billFrom,billTo,subTotal,salesTax,salesTaxVal,services){
        this.id = id;
        this.title = title;
        this.date = date;
        this.billTo = billTo;
        this.billFrom = billFrom;
        this.subTotal = subTotal;
        this.salesTax = salesTax;
        this.salesTaxVal = salesTaxVal;
        this.totalDue = salesTaxVal + subTotal;
        this.services = services;
    }

    addNewService(description, quantity, cost, tax){
        let newService = new Service(id,description, quantity, unitPrice);
    }
}

module.exports = Invoice;