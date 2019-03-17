const Invoice = require('./model/Invoice.js');
const InvoicesDAO = require('./DAO/InvoicesDAO');

class InvoicesController{
    
        constructor(app){
            this.app = app;
            this.invoicesDAO = new InvoicesDAO();
        }

        setRoutes(){
            this.setRouteAddingNewInvoice();
            this.setRouteDisplayingAllInvoices();
            this.setRoutePostEditingInvoice();
            this.setRouteDeleteInvoice();
        }

        setRouteAddingNewInvoice(){
            console.log("-- init PUT (/myAccount/invoices) starting route");
            this.app.put('/myAccount/invoices', (req,res) =>{
                this.invoicesDAO.addNewInvoice(req).then((assignedID)=>{
                    res.send(assignedID);
                }).catch(error => {console.log(error.message)});
            });
        }

        setRouteDisplayingAllInvoices(){
            console.log("-- init GET (/myAccount/invoices) starting route");
            this.app.get('/myAccount/invoices', (req, res) =>{
                this.invoicesDAO.getAllInvoices().then((invoices)=>{
                    res.send(invoices);
                  })
            });
        }

        setRouteDeleteInvoice(){
            console.log("-- init DELETE (/myAccount/invoices:invoiceId) starting route");
            this.app.delete('/myAccount/invoices/:invoiceId' , (req,res) =>{
                this.deleteInvoiceFromList(req);
                res.send(`INVOICE DELETED`);
            });
        }

        setRoutePostEditingInvoice(){
            console.log("-- init POST (/myAccount/invoices:invoiceId) starting route");
            this.app.post('/myAccount/invoices/edit/:invoiceId' , (req,res) =>{
                this.invoicesDAO.updateInvoice(req);
                // this.replaceInvoiceProperties(req);
                res.send(`INVOICE SAVED`);
            })
        }

        replaceInvoiceProperties(request){
            const id = request.params.invoiceId;
            // const updatedInvoice = this.createNewInvoice(request);
            // this.invoicesDAO.updateInvoice(id, updatedInvoice);
        }

        deleteInvoiceFromList(request){
            const id = request.params.invoiceId;
            this.invoicesDAO.deleteInvoice(id);
        }
    }
    
    module.exports = InvoicesController;