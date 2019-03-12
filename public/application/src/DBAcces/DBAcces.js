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



}

export default DBAcces;