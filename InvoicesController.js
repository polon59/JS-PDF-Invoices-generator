const Invoice = require('./model/Invoice.js');

class InvoicesController{
    
        constructor(app){
            this.app = app;
            this.invoices = [
                {id: 1, title: "invoice 11445", date:"2017-02-14", billTo:"Mariusz Pudzianowski", billFrom:"My company", subTotal:1220, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:1, description:"descr", quantity:10, unitPrice:1200}, {id:2, description:"descr", quantity:1, unitPrice:100}]},
                {id: 2, title: "invoice 992/1012", date:"2016-04-10", billTo:"Barbara Karwasz-Barabasz", billFrom:"My company 2", subTotal:0, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:3, description:"descr", quantity:10, unitPrice:1200}, {id:4, description:"descr", quantity:10, unitPrice:120}]},
                {id: 3, title: "invoice 445/6", date:"2017-02-11", billTo:"Janusz Nocnik", billFrom:"My company 3", subTotal:1340, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:5, description:"descr", quantity:1, unitPrice:12050}]},
                {id: 4, title: "invoice 9923/22", date:"2017-12-23", billTo:"Radosław Turkuć-Podjadek", billFrom:"My company 4", subTotal:5001.45, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:6, description:"descr", quantity:5, unitPrice:80}, {id:7, description:"descr", quantity:2, unitPrice:1705}, {id:8, description:"descr", quantity:7, unitPrice:1200}]},
                {id: 5, title: "invoice 223/5", date:"2017-10-09", billTo:"Joanna Drapieżna", billFrom:"My company 5", subTotal:0, salesTax:120, salesTaxVal:0, totalDue:0, services:[{id:9, description:"descr", quantity:10, unitPrice:1200}, {id:10, description:"descr", quantity:1, unitPrice:11200},{id:11, description:"descr", quantity:10, unitPrice:1200}, {id:12, description:"descr", quantity:5, unitPrice:10}]}
              ];
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
                res.send(invoices);
                // res.render("invoices", {
                //     invoices
                // });
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

                res.send(`INVOICE SAVED`);
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