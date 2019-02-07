const Invoice = require('./model/Invoice.js')

class InvoicesController{
    
        constructor(app){
            this.app = app;
            this.invoices = [];
            this.setRoutes();
        }


        addNewInvoice(request){
            let newId = this.invoices.length+1;

            const newInvoice = {
                id: newId,
                title: request.body.title,
                billFrom: request.body.billFrom,
                billTo: request.body.billTo
            }
        
            this.invoices.push(newInvoice);
        }


        setRoutes(){
            console.log("[INFO] Starting server routes");
            this.setRouteAddingNewInvoice();
            this.setRouteDisplayingAllInvoices();
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
    }
    
    module.exports = InvoicesController;