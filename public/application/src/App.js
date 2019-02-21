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
      {id: 3, title: "invoice3", billTo:"bill to three", billFrom:"bill from 3", services:[{id:5, description:"descr", quantity:1, cost:12050, tax:23}, {id:6, description:"descr", quantity:5, cost:80, tax:23}]},
      {id: 4, title: "invoice4", billTo:"bill to four", billFrom:"bill from 4", services:[{id:7, description:"descr", quantity:2, cost:1705, tax:23}, {id:8, description:"descr", quantity:7, cost:1200, tax:23}]},
      {id: 5, title: "invoice5", billTo:"bill to five", billFrom:"bill from 5", services:[{id:9, description:"descr", quantity:10, cost:1200, tax:23}, {id:10, description:"descr", quantity:1, cost:11200, tax:23}]}
    ],
    invoiceToEdit : ""
  }


  addInvoice = (invoice) => {
    let invoices = [...this.state.invoices, invoice];
    this.setState({
      invoices: invoices
    });
  }


  setInvoiceToEdit = (invoice) =>{
    let newInvoiceToEdit = Object.assign({}, invoice);
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


  updateInvoicesList = () =>{
    let invoices = this.state.invoices;
    let indexToUpdate = invoices.findIndex(invoice => invoice.id === this.state.invoiceToEdit.id);
    invoices[indexToUpdate] = this.state.invoiceToEdit;

    this.setState({
      invoices : invoices,
      invoiceToEdit : ""
    });
  }


  deleteInvoice = (invoiceToDeleteId) => {
    let invoices = this.state.invoices.filter(invoice =>{
      return invoice.id !== invoiceToDeleteId;
    })
    this.setState({
      invoices: invoices
    });
  }

  render() {
    return (
      <div className="App">
          <Navbar/>
          <InvoicesList setInvoiceToEdit={this.setInvoiceToEdit} deleteInvoice={this.deleteInvoice} invoices={this.state.invoices}/>
        <br/>
        <AddInvoice addInvoice={this.addInvoice}/>
        <EditInvoice updateInvoicesList={this.updateInvoicesList} changeInvoiceToEdit={this.changeInvoiceToEdit} invoiceToEdit={this.state.invoiceToEdit}/>
      </div>
    );
  }
}

export default App;