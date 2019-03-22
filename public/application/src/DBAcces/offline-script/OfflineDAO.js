class OfflineDAO{
    
    constructor(DBAcces){
        this.DBAcces = DBAcces;
        this.invoicesGeneratorOfflineData = this.initializeDataToSave();
        // this.invoicesGeneratorOfflineData = {
        //     add:[],
        //     update:[],
        //     delete:[]
        // }
    }

    initializeDataToSave = () =>{
        if (!localStorage.getItem('invoicesGeneratorOfflineData')){
            return {add:[], update:[], delete:[]}
        }

        return JSON.parse(localStorage.getItem('invoicesGeneratorOfflineData'));
    }

    addDataToSave = (data,method)=>{
        if (method === 'add') {
            this.addNewInvoice(data);
        } 
        else if (method === 'update') {
            this.updateInvoice(data);
        }
        else{
            this.deleteInvoice(data);
        }
    }

    saveDataInLocalStorage = () =>{
        localStorage.setItem('invoicesGeneratorOfflineData', JSON.stringify(this.invoicesGeneratorOfflineData));
    }

    addNewInvoice = (invoiceToAdd) =>{
        if (invoiceToAdd.isOffline){this.replaceInvoiceToAdd(invoiceToAdd);return}
        this.invoicesGeneratorOfflineData['add'].push(invoiceToAdd);
        console.log(this.invoicesGeneratorOfflineData);
        this.saveDataInLocalStorage();
    }

    updateInvoice = (updatedInvoice) =>{
        if (updatedInvoice.isOffline){this.replaceInvoiceToAdd(updatedInvoice);return}
        this.invoicesGeneratorOfflineData['update'].push(updatedInvoice);
        console.log(this.invoicesGeneratorOfflineData);
        this.saveDataInLocalStorage();
    }

    deleteInvoice = (invoiceToDeleteId) =>{
        this.invoicesGeneratorOfflineData['delete'].push(invoiceToDeleteId);
        console.log(this.invoicesGeneratorOfflineData);
        this.saveDataInLocalStorage();
    }

    replaceInvoiceToAdd = (newInvoice) =>{
        console.log("replacing in LS list");
        this.invoicesGeneratorOfflineData.add.forEach(savedInvoice => {
            if (savedInvoice.id === newInvoice.id){
                savedInvoice = newInvoice;
            }
        });
        console.log(this.invoicesGeneratorOfflineData);
        this.saveDataInLocalStorage();
    }
}

export default OfflineDAO;