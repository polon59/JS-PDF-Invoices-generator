import React, { Component } from 'react';
import Navbar from './Navbar-Components/navbar';
import './App.css';
import InvoicesList from './Invoices-List-Components/InvoicesList';
import AddInvoice from './Add-Invoice-Components/AddInvoice';
import EditInvoice from './Edit-Invoice-Components/EditInvoice';
import MyAccount from './My-Account-Components/MyAccount';
import Statistics from './Statistics-Components/Statistics';
import ViewInvoice from './View-Invoice-Components/ViewInvoice';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


class App extends Component {
  constructor(){
    super();
    this.state = {
      invoices : [],
      invoiceToEdit : "",
      displayedComponent: "MyAccount"
    }
    this.initializeInvoices();
  }

  initializeInvoices = () =>{
    fetch('http://localhost:8000/myAccount/invoices?')
    .then(response => response.json())
    .then(data => this.setState({
      invoices : data
    }))
    .catch(error => {
      alert("Warning: You are in offline mode, Your invoices cannot be loaded");
    });
  }

  createNewInvoice = () =>{
    const id = Math.random();
    let newInvoice = {id: id, title: "", date:"2017-02-14", billTo:"", billFrom:"",subTotal:0, salesTax:0, salesTaxVal:0, totalDue:0, services:[]};
    this.saveEditedInvoice(newInvoice)
    return newInvoice;
  }


  addCreatedInvoiceToList = () =>{
    let invoiceToAdd = this.state.invoiceToEdit;
    let invoices = this.state.invoices;
    invoices.push(invoiceToAdd);
    this.updateLocalInvoicesList(invoices);
    this.addInvoiceToDB(invoiceToAdd);
    //this.saveChanges();
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
      // console.log(JSON.parse(response));   
    });
   
  }


  addServiceToInvoiceToEdit = (newService) =>{
    const {invoiceToEdit} = this.state;
    invoiceToEdit.services.push(newService);
    this.saveEditedInvoice(invoiceToEdit);
  }


  //todo
  changeCurrentInvoice = (invoiceID) =>{
    let newInvoiceToEdit;
    this.state.invoices.forEach(invoice => {
      if(invoice.id === invoiceID){
        newInvoiceToEdit = invoice;
      }
    });
    this.saveEditedInvoice(newInvoiceToEdit);
  }


  calculateSubTotal = () =>{
    let invoiceToEdit = this.state.invoiceToEdit;
    let subTotal = 0;

    invoiceToEdit.services.forEach(service =>{
      subTotal += service.unitPrice * service.quantity;
    });
    const salesTaxVal = subTotal*invoiceToEdit.salesTax/100;
    invoiceToEdit.subTotal = subTotal;
    invoiceToEdit.salesTaxVal = salesTaxVal;
    invoiceToEdit.totalDue = salesTaxVal + subTotal;
    this.saveEditedInvoice(invoiceToEdit);
  }


  changeInvoiceToEdit = (e) =>{
    const changedProperty = e.target.id;
    const changedValue = e.target.value;
    if (changedProperty === "salesTax"){
      this.handleSalesTaxChange(changedValue);
    }
    let changedInvoiceToEdit = this.state.invoiceToEdit;
    changedInvoiceToEdit[changedProperty] = changedValue;
    this.saveEditedInvoice(changedInvoiceToEdit);
  }


  handleSalesTaxChange = (newSalesTax) =>{
    let invoiceToEdit = this.state.invoiceToEdit;
    const {subTotal} = invoiceToEdit;
    const newSalesTaxVal = subTotal*newSalesTax/100;
    invoiceToEdit.salesTaxVal = newSalesTaxVal;
    invoiceToEdit.totalDue = subTotal + newSalesTaxVal;
    this.saveEditedInvoice(invoiceToEdit);
  }


  saveEditedInvoice = (editedInvoice) =>{
    this.setState({
      invoiceToEdit : editedInvoice
    });
  }


  deleteServiceFromInvoiceToEdit = (serviceToDeleteId) =>{
    const {invoiceToEdit} = this.state;
    const updatedServicesList = invoiceToEdit.services.filter(service =>{
      return service.id !== serviceToDeleteId;
    });
    invoiceToEdit.services = updatedServicesList;
    this.calculateSubTotal();
    this.saveEditedInvoice(invoiceToEdit);
  }


  saveChanges = () =>{
    //used by handleSubmit in editInvoice component after redirect to inv.list
    const updatedInvoice = this.state.invoiceToEdit;
    console.log(updatedInvoice);
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
      alert("Warning: You are in offline mode, saving to database failed.");
    })
  }

  updateLocalInvoicesList = (updatedList) =>{
    this.setState({
      invoices: updatedList,
    });
  }


  deleteInvoice = (invoiceToDeleteId) => {
    const {invoices} = this.state;
    const updatedInvoices = invoices.filter(invoice =>{
      return invoice.id !== invoiceToDeleteId;
    });
    this.updateLocalInvoicesList(updatedInvoices);
  }

  render() {
    const {invoiceToEdit,invoices} = this.state;
    return (
        <Router>
        <div className="container">
          <Navbar/>
          <Route exact path="/" component={MyAccount}/>
          <Route path="/statistics" component={Statistics} />
          <Route 
            path="/myInvoices/editInvoice/:id" 
            render={(props) => 
              <EditInvoice 
                calculateSubTotal={this.calculateSubTotal} 
                redirect='view' 
                deleteServiceFromInvoice={this.deleteServiceFromInvoiceToEdit} 
                saveChanges={this.saveChanges} 
                addService={this.addServiceToInvoiceToEdit} 
                changeInvoiceToEdit={this.changeInvoiceToEdit} 
                invoiceToEdit={invoiceToEdit}
              />}
          />
          <Route 
            path="/myInvoices/viewInvoice/:id" 
            render={(props) => 
              <ViewInvoice 
                invoiceToEdit={invoiceToEdit} 
                changeCurrentInvoice={this.changeCurrentInvoice} 
              />}
          />
          <Route
            exact path='/myInvoices'
            render={(props) => 
              <InvoicesList 
                changeCurrentInvoice={this.changeCurrentInvoice} 
                deleteInvoice={this.deleteInvoice} 
                invoices={invoices}
              />}
          />
          <Route
            path='/addInvoice'
            render={(props) => 
              <AddInvoice 
                createNewInvoice={this.createNewInvoice} 
                calculateSubTotal={this.calculateSubTotal} 
                addCreatedInvoiceToList={this.addCreatedInvoiceToList} 
                deleteService={this.deleteServiceFromInvoiceToEdit} 
                addService={this.addServiceToInvoiceToEdit} 
                changeInvoiceToEdit={this.changeInvoiceToEdit} 
                invoiceToEdit={invoiceToEdit}/>}
          />
        </div>
      </Router>
    );
  }
}

export default App;