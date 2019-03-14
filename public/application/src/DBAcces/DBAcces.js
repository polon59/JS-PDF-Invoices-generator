class DBAcces{

    getInvoicesFromDB = () =>{
        return fetch('http://localhost:8000/myAccount/invoices?')
            .then(response => response.json())
            .then(data => 
            {console.log(data)
              return data;}
            )
            .catch(error => {
            // alert("Warning: You are in offline mode, Your invoices cannot be loaded");
            return [];
            });
    }

    addInvoiceToDB = (invoiceToAdd) =>{
        fetch('http://localhost:8000/myAccount/invoices', {
           method: "POST",
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(invoiceToAdd)
         })
         .then(function(response){   
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
        .then(function(response){ 
          // console.log(JSON.parse(response));   
        })
        .catch(error => {
          // alert("Warning: You are in offline mode, deleting invoice from database failed.");
        })
      }
}

export default DBAcces;