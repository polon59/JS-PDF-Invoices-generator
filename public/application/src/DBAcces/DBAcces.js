class DBAcces{

    getInvoicesFromDB = () =>{
        return fetch('http://localhost:8000/myAccount/invoices?')
            .then(response => response.json())
            .then(data => 
            {return data;}
            )
            .catch(error => {
            alert("Warning: You are in offline mode, Your invoices cannot be loaded");
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
           console.log(JSON.parse(response));   
         });
    }



}

export default DBAcces;