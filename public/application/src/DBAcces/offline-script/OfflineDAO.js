class OfflineDAO{
    
    constructor(DBAcces){
        this.DBAcces = DBAcces;
        this.invoicesGeneratorOfflineData = initializeDataToSave();
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



}

export default OfflineDAO;