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

        createNewInvoice(request){
            const reqBody = request.body;
            const {id,title,date,billFrom,billTo,subTotal,salesTax,salesTaxVal,services} = reqBody;
            const newInvoice = new Invoice(id,title,date,billFrom,billTo,subTotal,salesTax,salesTaxVal,services);
            return newInvoice;
        }
        
        setRouteAddingNewInvoice(){
            console.log("-- init POST (/myAccount/invoices) starting route");
            this.app.post('/myAccount/invoices', (req,res) =>{
            const newInvoice = this.createNewInvoice(req);
            this.invoicesDAO.addNewInvoice(newInvoice);
            });
        }

        setRouteDisplayingAllInvoices(){
            console.log("-- init GET (/myAccount/invoices) starting route");
            this.app.get('/myAccount/invoices', (req, res) =>{
                const invoices = this.invoicesDAO.getAllInvoices();
                res.send(invoices);
            });
        }

        replaceInvoiceProperties(request){
            const id = request.params.invoiceId;
            const updatedInvoice = this.createNewInvoice(request);
            this.invoicesDAO.updateInvoice(id, updatedInvoice);
        }

        setRouteDeleteInvoice(){
            this.app.delete('/myAccount/invoices/:invoiceId' , (req,res) =>{
                this.deleteInvoiceFromList(req);
                res.send(`INVOICE DELETED`);
            });
        }

        deleteInvoiceFromList(request){
            const id = request.params.invoiceId;
            this.invoicesDAO.deleteInvoice(id);
        }

        setRoutePostEditingInvoice(){
            this.app.post('/myAccount/invoices/edit/:invoiceId' , (req,res) =>{
                this.replaceInvoiceProperties(req);
                res.send(`INVOICE SAVED`);
            })
        }
    }
    
    module.exports = InvoicesController;