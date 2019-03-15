class DBAcces{

    getInvoicesFromDB = () =>{
      return fetch('http://localhost:8000/myAccount/invoices?',{
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(data => {return data;})
        .catch(error => {
          alert("Warning: You are in offline mode, Your invoices cannot be loaded");
          return [];
        });
    }

    addInvoiceToDB = (invoiceToAdd) =>{
        return fetch('http://localhost:8000/myAccount/invoices', {
           method: "PUT",
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(invoiceToAdd)
         })
         .then(response => response.json())
         .then(data=>{
           const assignedID = data['LAST_INSERT_ID()'];
          console.log(`Created new invoice with id = ${assignedID} recieved from database`)  
           return assignedID;
         })
         .catch(error => {
           alert("Warning: You are in offline mode, new invoice will be saved locally");
           let temporaryID = Math.random();
           return temporaryID;
           });
    }

    updateInvoice = (updatedInvoice) =>{
        fetch(`http://localhost:8000/myAccount/invoices/edit/${updatedInvoice.id}`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedInvoice)
        })
        .then(function(response){ 
          // console.log(JSON.parse(response));   
        })
        .catch(error => {
          // alert("Warning: You are in offline mode, saving to database failed.");
        })
    }

    deleteInvoiceFromDB = (invoiceToDeleteId) =>{
        fetch(`http://localhost:8000/myAccount/invoices/${invoiceToDeleteId}`, {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: invoiceToDeleteId
        })
        .then((response)=>{ 
          console.log(`Deleted invoice with id = ${invoiceToDeleteId} from database`);  
        })
        .catch(error => {
          alert("Warning: You are in offline mode, Changes will be saved locally");
          //add invoice to delete to list in LStorage
        })
      }
}

export default DBAcces;