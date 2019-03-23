class DBAcces{

  constructor(mainComponent){
    this.mainComponent = mainComponent;
  }

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
      throw new Error(error.message);
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
      const assignedID = data["idValue"];
      console.log(`Created new invoice with id = ${assignedID} recieved from database`) ;
      return assignedID;
    })
    .catch(error => {
      alert("Warning: You are in offline mode, new invoice will be saved locally");
      console.log(error.message);
      throw new Error(error.message)
      
    });
  }

  updateInvoice = (updatedInvoice) =>{
    // fix updating temporary invoice after returned connection
    return fetch(`http://localhost:8000/myAccount/invoices/edit/${updatedInvoice.id}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInvoice)
    })
    .then((response)=>{ 
      console.log(`Successfully updated invoice with ID = ${updatedInvoice.id}`);
    })
    .catch(error => {
      alert("Warning: You are in offline mode, changes will be saved locally.");
      console.log(error.message);
      throw new Error(error.message)
      //add invoice to delete to list in LStorage
    })
  }

  getStatisticsForYear = (year) =>{
    return fetch(`http://localhost:8000/myAccount/statistics/getFor/${year}`,{
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {return data;})
    .catch(error => {
      console.log(error.message);
      throw new Error(error.message)
    });
  }

  deleteInvoiceFromDB = (invoiceToDeleteId) =>{
    return fetch(`http://localhost:8000/myAccount/invoices/${invoiceToDeleteId}`, {
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
      throw new Error(error.message);
      //add invoice to delete to list in LStorage
    })
  }
}

export default DBAcces;