const Service = require('./Service.js');

class Invoice{

    constructor(){
        this.id = id;
        this.title = title;
        this.date = date;
        this.billFrom = billFrom;
        this.billTo = billTo;
        this.services = [];
    }
}

module.exports = Invoice;