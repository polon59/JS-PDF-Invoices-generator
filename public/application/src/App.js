import React, { Component } from 'react';
import Navbar from './navbar';
import './App.css';
import InvoicesList from './InvoicesList';
import AddInvoice from './AddInvoice';
import EditInvoice from './EditInvoice';


class App extends Component {
  state = {
    invoices : [
      {id: 1, title: "invoice1", billTo:"bill to one", billFrom:"bill from 1", services:"some service 1"},
      {id: 2, title: "invoice2", billTo:"bill to two", billFrom:"bill from 2", services:"some service 2"},
      {id: 3, title: "invoice3", billTo:"bill to three", billFrom:"bill from 3", services:"some service 3"},
      {id: 4, title: "invoice4", billTo:"bill to four", billFrom:"bill from 4", services:"some service 4"},
      {id: 5, title: "invoice5", billTo:"bill to five", billFrom:"bill from 5", services:"some service 5"}
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