import React, { Component } from 'react';
import Navbar from './navbar';
import './App.css';
import InvoicesList from './InvoicesList';
import AddInvoice from './AddInvoice';
import EditInvoice from './EditInvoice';


class App extends Component {
  state = {
    invoices : [
      {id: 1, title: "invoice1", billTo:"bill to one"},
      {id: 2, title: "invoice2", billTo:"bill to two"},
      {id: 3, title: "invoice3", billTo:"bill to three"},
      {id: 4, title: "invoice4", billTo:"bill to four"}
    ],
    invoiceToEdit : {id: 1, title: "invoice1", billTo:"bill to one"}
  }


  addInvoice = (invoice) => {
    invoice.id = Math.random();
    let invoices = [...this.state.invoices, invoice];
    this.setState({
      invoices: invoices
    });
  }

  setInvoiceToEdit = (invoiceToEdit) =>{
    // console.log(invoiceToEdit);

    this.setState({
      invoiceToEdit : invoiceToEdit
    });

    // console.log(this.state.invoiceToEdit);
  }

  updateInvoice = (updatedInvoice) =>{
    console.log(`UPDATED INVOICE RECIEVED AS ID:${updatedInvoice.id}, TITLE:${updatedInvoice.title} , BILLTO:${updatedInvoice.billTo}`)
    let invoices = this.state.invoices;
    let indexToUpdate = invoices.findIndex(invoice => invoice.id === updatedInvoice.id);
    invoices[indexToUpdate] = updatedInvoice;

    this.setState({
      invoices : invoices
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
        <EditInvoice updateInvoice={this.updateInvoice} invoiceToEdit={this.state.invoiceToEdit}/>
      </div>
    );
  }
}

export default App;