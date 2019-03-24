const async=require('async');

class OfflineDAO{
    
    constructor(DBAcces){
        this.DBAcces = DBAcces;
        this.invoicesGeneratorOfflineData = this.initializeDataToSave();
    }

    getInvoicesListSavedLocally = () =>{
        return this.invoicesGeneratorOfflineData.add.concat(this.invoicesGeneratorOfflineData.update);
    }

    initializeDataToSave = () =>{
        if (!localStorage.getItem('invoicesGeneratorOfflineData')){
            return {add:[], update:[], delete:[]}
        }
        return JSON.parse(localStorage.getItem('invoicesGeneratorOfflineData'));
    }

    saveDataInLocalStorage = () =>{
        localStorage.setItem('invoicesGeneratorOfflineData', JSON.stringify(this.invoicesGeneratorOfflineData));
    }

    addNewInvoice = (invoiceToAdd) =>{
        if (invoiceToAdd.isOffline){this.replaceInvoiceToAdd(invoiceToAdd);return}
        this.invoicesGeneratorOfflineData['add'].push(invoiceToAdd);
        this.saveDataInLocalStorage();
    }

    updateInvoice = (updatedInvoice) =>{
        if (updatedInvoice.isOffline){this.replaceInvoiceToAdd(updatedInvoice);return}
        this.invoicesGeneratorOfflineData['update'].push(updatedInvoice);
        this.saveDataInLocalStorage();
    }

    deleteInvoice = (invoiceToDeleteId) =>{
        if (this.isInvoiceWithGivenIDIsInAddList(invoiceToDeleteId)) {return;}
        this.isInvoiceWithGivenIDIsInEditList(invoiceToDeleteId);
        this.invoicesGeneratorOfflineData['delete'].push(invoiceToDeleteId);
        this.saveDataInLocalStorage();
    }

    replaceInvoiceToAdd = (newInvoice) =>{
        this.invoicesGeneratorOfflineData.add.forEach(savedInvoice => {
            if (savedInvoice.id === newInvoice.id){
                savedInvoice = newInvoice;
            }
        });
        this.saveDataInLocalStorage();
    }

    isInvoiceWithGivenIDIsInEditList = (invoiceToDeleteId) => {
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

    isInvoiceWithGivenIDIsInAddList = (invoiceToDeleteId) =>{
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
        }return idWasInList;
    }

    sendInvoicesToAddToDB = () =>{
        const addList = this.invoicesGeneratorOfflineData['add']
        return new Promise((resolve,reject)=>{
            async.forEachOf(addList,(invoiceToAdd,key,callback)=>{
                this.DBAcces.addInvoiceToDB(invoiceToAdd).then(()=>{
                    callback();
                })
            },()=>{resolve();});
        })
    }

    sendInvoicesToUpdateToDB = () =>{
        const editList = this.invoicesGeneratorOfflineData['update']
        return new Promise((resolve,reject)=>{
            async.forEachOf(editList,(updatedInvoice,key,callback)=>{
                this.DBAcces.updateInvoice(updatedInvoice).then(()=>{
                    callback();
                })
            },()=>{resolve();});
        })
    }

    sendInvoicesToDeleteToDB = () =>{
        const deleteList = this.invoicesGeneratorOfflineData['delete']
        return new Promise((resolve,reject)=>{
            async.forEachOf(deleteList,(invoiceID,key,callback)=>{
                this.DBAcces.deleteInvoiceFromDB(invoiceID).then(()=>{
                    callback();
                })
            },()=>{resolve();});
        })
    }


    sendStoredDataToDB = () =>{
        return new Promise((resolve,reject)=>{
            Promise.all(
                [this.sendInvoicesToAddToDB(),
                this.sendInvoicesToUpdateToDB(),
                this.sendInvoicesToDeleteToDB()])
            .then(()=> {
                localStorage.removeItem("invoicesGeneratorOfflineData");
                resolve();
            })
            .catch(err=>{
                reject(new Error(err.message));
            })
        })
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

}

export default OfflineDAO;