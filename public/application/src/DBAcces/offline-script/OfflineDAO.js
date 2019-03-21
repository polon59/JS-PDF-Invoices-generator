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
        return localStorage.getItem('invoicesGeneratorOfflineData');
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

    addNewInvoice = (invoiceToAdd) =>{
        this.invoicesGeneratorOfflineData['add'].push(invoiceToAdd);
        console.log(this.invoicesGeneratorOfflineData);
    }

    updateInvoice = (updatedInvoice) =>{
        this.invoicesGeneratorOfflineData['update'].push(updatedInvoice);
        console.log(this.invoicesGeneratorOfflineData);
    }

    deleteInvoice = (invoiceToDeleteId) =>{
        this.invoicesGeneratorOfflineData['delete'].push(invoiceToDeleteId);
        console.log(this.invoicesGeneratorOfflineData);
    }



}

export default OfflineDAO;