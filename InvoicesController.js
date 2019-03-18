const Invoice = require('./model/Invoice.js');
const InvoicesDAO = require('./DAO/InvoicesDAO');
const DbCon = require('./DAO/dbConn');

class InvoicesController{
    
        constructor(app){
            this.app = app;
            this.dataBaseConn = new DbCon();
            this.connection = this.dataBaseConn.connection;
            this.invoicesDAO = new InvoicesDAO(this.connection);
        }

        setRoutes(){
            this.setRouteAddingNewInvoice();
            this.setRouteDisplayingAllInvoices();
            this.setRoutePostEditingInvoice();
            this.setRouteDeleteInvoice();
        }

        setRouteAddingNewInvoice(){
            this.app.put('/myAccount/invoices', (req,res) =>{
                this.invoicesDAO.addNewInvoice(req)
                .then((assignedID)=>{
                    res.send(assignedID);
                })
                .catch(error => {console.log(error.message)});
            });
        }

        setRouteDisplayingAllInvoices(){
            this.app.get('/myAccount/invoices', (req, res) =>{
                this.invoicesDAO.getAllInvoices()
                .then((invoices)=>{
                    res.send(invoices);
                })
                .catch(error => {console.log(error.message)});
            });
        }

        setRouteDeleteInvoice(){
            this.app.delete('/myAccount/invoices/:invoiceId' , (req,res) =>{
                const id = req.params.invoiceId;
                this.invoicesDAO.deleteInvoice(id);
                res.send(`INVOICE DELETED`);
            });
        }

        setRoutePostEditingInvoice(){
            this.app.post('/myAccount/invoices/edit/:invoiceId' , (req,res) =>{
                this.invoicesDAO.updateInvoice(req);
                res.send(`INVOICE SAVED`);
            })
        }
    }
    
    module.exports = InvoicesController;