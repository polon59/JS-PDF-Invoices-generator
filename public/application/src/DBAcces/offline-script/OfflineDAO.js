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
        if (this.isInvoiceWithGivenIDIsInAddList(invoiceToDeleteId)) {
            console.log(this.invoicesGeneratorOfflineData);
            return;
        }
        console.log("POLAZŁEM DALEJ")
        this.isInvoiceWithGivenIDIsInEditList(invoiceToDeleteId);
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

    isInvoiceWithGivenIDIsInEditList(invoiceToDeleteId){
        let newDataList = this.invoicesGeneratorOfflineData.edit;
        if (newDataList){
            this.invoicesGeneratorOfflineData.edit.forEach((savedInvoice,i) => {
                if (savedInvoice.id === invoiceToDeleteId){
                    newDataList.splice(i,1);
                    this.invoicesGeneratorOfflineData.edit = newDataList;
                }
            });
        }
    }

    isInvoiceWithGivenIDIsInAddList = (invoiceToDeleteId)=>{
        let newDataList = this.invoicesGeneratorOfflineData.add;
        let idWasInList = false;
        if (newDataList) {
            this.invoicesGeneratorOfflineData.add.forEach((savedInvoice,i) => {
                if (savedInvoice.id === invoiceToDeleteId){
                    newDataList.splice(i,1);
                    this.invoicesGeneratorOfflineData.add = newDataList;
                    this.saveDataInLocalStorage();
                    idWasInList = true;
                }
            });

        }
        return idWasInList;
    }
}

export default OfflineDAO;