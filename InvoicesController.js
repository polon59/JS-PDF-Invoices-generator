const Invoice = require('./model/Invoice.js');

class InvoicesController{
    
        constructor(app){
            this.app = app;
            this.invoices = [];
        }


        addNewInvoice(request){
            const reqBody = request.body;
            let id = this.invoices.length+1;
            let title = reqBody.title;
            let date = reqBody.date;
            let billFrom = reqBody.billFrom;
            let billTo = reqBody.billTo;
            const newInvoice = new Invoice(id, title, date, billFrom, billTo);

            this.invoices.push(newInvoice);
        }


        setRoutes(){
            console.log("[INFO] Starting server routes");
            this.setRouteAddingNewInvoice();
            this.setRouteDisplayingAllInvoices();
            this.setRouteAddingInvoice();
            console.log("[INFO] Route initializing completed");
        }


        setRouteAddingNewInvoice(){
            console.log("-- init POST (/myAccount/invoices) starting route");

            this.app.post('/myAccount/invoices', (req,res) =>{
            this.addNewInvoice(req);
            let invoices = this.invoices;

                res.render("invoices", {
                    invoices
                });
            });
        }


        setRouteDisplayingAllInvoices(){
            console.log("-- init GET (/myAccount/invoices) starting route");

            this.app.get('/myAccount/invoices', (req, res) =>{
                res.send(this.invoices);
                // res.render("invoices", {
                //     invoices
                // });
            });
        }


        setRouteAddingInvoice(){
            console.log("-- init GET (/myAccount/invoices/addInvoice) starting route");

            this.app.get('/myAccount/invoices/addInvoice', (req,res) =>{
                res.render("addInvoice");
            });
        }
    }
    
    module.exports = InvoicesController;