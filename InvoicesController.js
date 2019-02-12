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
            this.setRouteGetEditingInvoice();
            this.setRoutePostEditingInvoice();
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
                // res.send(this.invoices);
                const invoices = this.invoices;
                res.render("invoices", {
                    invoices
                });
            });
        }

        setRoutePostEditingInvoice(){
            this.app.post('/myAccount/invoices/edit/:invoiceId' , (req,res) =>{
                const invoiceToSaveId = req.params.invoiceId;
                // Change values of invoice in database with given ID
                const invoiceToSaveIndex = this.findIndexInArrayByID(invoiceToSaveId);
                const reqBody = req.body;
                this.invoices[invoiceToSaveIndex].title =  reqBody.title;
                this.invoices[invoiceToSaveIndex].date = reqBody.date;
                this.invoices[invoiceToSaveIndex].billFrom = reqBody.billFrom;
                this.invoices[invoiceToSaveIndex].billTo = reqBody.billTo;

                res.send("INVOICE SAVED");
            })
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


        setRouteGetEditingInvoice(){
            console.log("-- init GET (/myAccount/invoices/edit/:invoiceId) starting route");
            this.app.get('/myAccount/invoices/edit/:invoiceId', (req,res) =>{
                const requestedInvoiceId = req.params.invoiceId;

                const invoiceToEdit = this.findInvoiceById(requestedInvoiceId);
                // res.send(invoiceToEdit);

                res.render("editInvoice", {
                    invoiceToEdit
                });
            });
        }


        findInvoiceById(requestedInvoiceId){
            let foundInvoice;
            this.invoices.forEach(invoice => {
                if(invoice.id == requestedInvoiceId){
                    console.log("found");
                    foundInvoice = invoice;
                }
            });
            return foundInvoice;
        }


        setRouteAddingInvoice(){
            console.log("-- init GET (/myAccount/invoices/addInvoice) starting route");

            this.app.get('/myAccount/invoices/addInvoice', (req,res) =>{
                res.render("addInvoice");
            });
        }
    }
    
    module.exports = InvoicesController;