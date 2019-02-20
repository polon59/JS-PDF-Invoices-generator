import React, { Component } from 'react';
import Navbar from './navbar';
import './App.css';
import InvoicesList from './InvoicesList';
import AddInvoice from './AddInvoice';


class App extends Component {
  state = {
    invoices : [
      {id: 1, title: "invoice1", billTo:"bill to one"},
      {id: 2, title: "invoice2", billTo:"bill to two"},
      {id: 3, title: "invoice3", billTo:"bill to three"},
      {id: 4, title: "invoice4", billTo:"bill to four"}
    ]
  }

  addInvoice = (invoice) => {
    invoice.id = Math.random();
    let invoices = [...this.state.invoices, invoice];
    this.setState({
      invoices: invoices
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
          <InvoicesList deleteInvoice={this.deleteInvoice} invoices={this.state.invoices}/>
        <br/>
        <AddInvoice addInvoice={this.addInvoice}/>
      </div>
    );
  }
}

export default App;
