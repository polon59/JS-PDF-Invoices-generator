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
            this.setRouteAddingNewInvoice();
            this.setRouteDisplayingAllInvoices();
        }


        setRouteAddingNewInvoice(){
            this.app.post('/myAccount/invoices', (req,res) =>{
            this.addNewInvoice(req);
            let invoices = this.invoices;

                res.render("invoices", {
                    invoices
                });
            });
        }


        setRouteDisplayingAllInvoices(){
            this.app.get('/myAccount/invoices', (req, res) =>{
                res.send(this.invoices);
                // res.render("invoices", {
                //     invoices
                // });
            });
        }
    }
    
    module.exports = InvoicesController;