class Invoice{

    constructor(){
        this.isOffline = false;
        this.id = Math.random();
        this.title = "";
        this.date = "2019-01-01";
        this.billTo = "";
        this.billFrom = "";
        this.subTotal = 0;
        this.salesTax = 0;
        this.salesTaxVal = 0;
        this.totalDue = 0;
        this.services = [];
    }
}

export default Invoice;