import React, { Component } from 'react';
import Navbar from './navbar';
import './App.css';
import InvoicesList from './InvoicesList';
import AddInvoice from './AddInvoice';
import EditInvoice from './EditInvoice';


class App extends Component {
  state = {
    invoices : [
      {id: 1, title: "invoice1", billTo:"bill to one", billFrom:"bill from 1", services:[{id:1, description:"descr", quantity:10, cost:1200, tax:23}, {id:2, description:"descr", quantity:1, cost:100, tax:23}]},
      {id: 2, title: "invoice2", billTo:"bill to two", billFrom:"bill from 2", services:[{id:3, description:"descr", quantity:10, cost:1200, tax:23}, {id:4, description:"descr", quantity:10, cost:120, tax:23}]},
      {id: 3, title: "invoice3", billTo:"bill to three", billFrom:"bill from 3", services:[{id:5, description:"descr", quantity:1, cost:12050, tax:23}]},
      {id: 4, title: "invoice4", billTo:"bill to four", billFrom:"bill from 4", services:[{id:6, description:"descr", quantity:5, cost:80, tax:23}, {id:7, description:"descr", quantity:2, cost:1705, tax:23}, {id:8, description:"descr", quantity:7, cost:1200, tax:23}]},
      {id: 5, title: "invoice5", billTo:"bill to five", billFrom:"bill from 5", services:[{id:9, description:"descr", quantity:10, cost:1200, tax:23}, {id:10, description:"descr", quantity:1, cost:11200, tax:23},{id:11, description:"descr", quantity:10, cost:1200, tax:23}, {id:12, description:"descr", quantity:5, cost:10, tax:23}]}
    ],
    invoiceToEdit : ""
  }


  addInvoice = (invoice) => {
    invoice.services = [];
    let invoices = [...this.state.invoices, invoice];
    this.setState({
      invoices: invoices
    });
  }

  addServiceToInvoiceToEdit = (newService) =>{
    const {invoiceToEdit} = this.state;
    invoiceToEdit.services.push(newService);
    this.setState({
      invoiceToEdit : invoiceToEdit
    })
  }

  setInvoiceToEdit = (invoiceID) =>{
    let newInvoiceToEdit;
    this.state.invoices.forEach(invoice => {
      if(invoice.id === invoiceID){
        newInvoiceToEdit = invoice;
      }
    });
    this.setState({
      invoiceToEdit : newInvoiceToEdit
    });
  }

  changeInvoiceToEdit = (e) =>{
    let changedInvoiceToEdit = this.state.invoiceToEdit;
    changedInvoiceToEdit[e.target.id] = e.target.value;
    this.setState({
      invoiceToEdit : changedInvoiceToEdit
    });
  }

  deleteServiceFromInvoiceToEdit = (serviceToDeleteId) =>{
    const {invoiceToEdit} = this.state;
    const updatedServicesList = invoiceToEdit.services.filter(service =>{
      return service.id !== serviceToDeleteId;
    });
    invoiceToEdit.services = updatedServicesList;
    this.setState({
      invoiceToEdit : invoiceToEdit
    })
    
  }

  saveChanges = () =>{
    // Add saving invoices to DB here
    console.log("saved to database")
    this.setState({
      invoiceToEdit : ""
    });
  }

  deleteInvoice = (invoiceToDeleteId) => {
    const {invoices} = this.state;
    const updatedInvoices = invoices.filter(invoice =>{
      return invoice.id !== invoiceToDeleteId;
    })
    this.setState({
      invoices: updatedInvoices
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <InvoicesList setInvoiceToEdit={this.setInvoiceToEdit} deleteInvoice={this.deleteInvoice} invoices={this.state.invoices}/>
        <br/>
        <AddInvoice addInvoice={this.addInvoice}/>
        <EditInvoice deleteServiceFromInvoice={this.deleteServiceFromInvoiceToEdit} saveChanges={this.saveChanges} addService={this.addServiceToInvoiceToEdit} changeInvoiceToEdit={this.changeInvoiceToEdit} invoiceToEdit={this.state.invoiceToEdit}/>
      </div>
    );
  }
}

export default App;