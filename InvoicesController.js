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
            this.setRouteAddingNewInvoice();
            this.setRouteDisplayingAllInvoices();
            this.setRouteAddingInvoice();
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

        setGetEditingInvoice(){
            console.log("-- init GET (/myAccount/invoices/edit/:invoiceId) starting route");

            const invoiceToEdit = this.findInvoiceById(requestedInvoiceId);

            this.app.get('/myAccount/invoices/edit/:invoiceId', (req,res) =>{
                res.render("addInvoice", {
                    invoiceToEdit
                });
            });
        }

        findInvoiceById(requestedInvoiceId){
            this.invoices.forEach(invoice => {
                if(invoice.id == requestedInvoiceId){
                    return invoice;
                }
            });
        }

        setPostEditingInvoice(){
            console.log("-- init GET (/myAccount/invoices/edit/:invoiceId) starting route");

            // save recieved invoice to db
            // this.app.get('/myAccount/invoices/edit/:invoiceId', (req,res) =>{
            //     res.render("addInvoice");
            // });
        }

        setRouteAddingInvoice(){
            console.log("-- init GET (/myAccount/invoices/addInvoice) starting route");

            this.app.get('/myAccount/invoices/addInvoice', (req,res) =>{
                res.render("addInvoice");
            });
        }
    }
    
    module.exports = InvoicesController;