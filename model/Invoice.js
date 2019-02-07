const Service = require('./Service.js');

class Invoice{

    constructor(id, title, date, billFrom, billTo){
        this.id = id;
        this.title = title;
        this.date = date;
        this.billFrom = billFrom;
        this.billTo = billTo;
        this.services = [];
    }

    addNewService(description, quantity, cost, tax){
        let newService = new Service(description, quantity, cost, tax);
    }
}

module.exports = Invoice;