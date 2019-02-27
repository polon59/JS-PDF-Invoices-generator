import React, { Component } from 'react';
import Navbar from './Navbar-Components/navbar';
import './App.css';
import InvoicesList from './InvoicesList';
import AddInvoice from './Add-Invoice-Components/AddInvoice';
import EditInvoice from './Edit-Invoice-Components/EditInvoice';
import MyAccount from './My-Account-Components/MyAccount';
import Statistics from './Statistics-Components/Statistics';
import ViewInvoice from './View-Invoice-Components/ViewInvoice';


class App extends Component {
  state = {
    invoices : [
      {id: 1, title: "invoice 11445", date:"2017-02-14", billTo:"Mariusz Pudzianowski", billFrom:"My company", subTotal:1220, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:1, description:"descr", quantity:10, unitPrice:1200}, {id:2, description:"descr", quantity:1, unitPrice:100}]},
      {id: 2, title: "invoice 992/1012", date:"2016-04-10", billTo:"Barbara Karwasz-Barabasz", billFrom:"My company 2", subTotal:0, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:3, description:"descr", quantity:10, unitPrice:1200}, {id:4, description:"descr", quantity:10, unitPrice:120}]},
      {id: 3, title: "invoice 445/6", date:"2017-02-11", billTo:"Janusz Nocnik", billFrom:"My company 3", subTotal:1340, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:5, description:"descr", quantity:1, unitPrice:12050}]},
      {id: 4, title: "invoice 9923/22", date:"2017-12-23", billTo:"Radosław Turkuć-Podjadek", billFrom:"My company 4", subTotal:5001.45, salesTax:0, salesTaxVal:0, totalDue:0, services:[{id:6, description:"descr", quantity:5, unitPrice:80}, {id:7, description:"descr", quantity:2, unitPrice:1705}, {id:8, description:"descr", quantity:7, unitPrice:1200}]},
      {id: 5, title: "invoice 223/5", date:"2017-10-09", billTo:"Joanna Drapieżna", billFrom:"My company 5", subTotal:0, salesTax:120, salesTaxVal:0, totalDue:0, services:[{id:9, description:"descr", quantity:10, unitPrice:1200}, {id:10, description:"descr", quantity:1, unitPrice:11200},{id:11, description:"descr", quantity:10, unitPrice:1200}, {id:12, description:"descr", quantity:5, unitPrice:10}]}
    ],
    invoiceToEdit : "",
    displayedComponent: "MyAccount"
  }


  createNewInvoice = () =>{
    const id = Math.random();
    let newInvoice = {id: id, title: "", date:"2017-02-14", billTo:"", billFrom:"",subTotal:0, salesTax:0, salesTaxVal:0, totalDue:0, services:[]};
    this.setState({
      invoiceToEdit : newInvoice,
      displayedComponent : "addInvoice"
    });
  }


  addCreatedInvoiceToList = () =>{
    let invoiceToAdd = this.state.invoiceToEdit;
    let invoices = this.state.invoices;
    invoices.push(invoiceToAdd);
    this.setState({
      invoices: invoices,
    });
    this.saveChanges();
  }


  addServiceToInvoiceToEdit = (newService) =>{
    const {invoiceToEdit} = this.state;
    invoiceToEdit.services.push(newService);
    this.saveEditedInvoice(invoiceToEdit);
  }


  //todo
  viewInvoice = (invoiceID) =>{
    let newInvoiceToEdit;
    this.state.invoices.forEach(invoice => {
      if(invoice.id === invoiceID){
        newInvoiceToEdit = invoice;
      }
    });
    this.setState({
      invoiceToEdit : newInvoiceToEdit,
      displayedComponent : "viewInvoice"
    });
  }

  setInvoiceToEdit = (invoiceID) =>{
    let newInvoiceToEdit;
    this.state.invoices.forEach(invoice => {
      if(invoice.id === invoiceID){
        newInvoiceToEdit = invoice;
      }
    });
    this.setState({
      invoiceToEdit : newInvoiceToEdit,
      displayedComponent : "editInvoice"
    });
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
      console.log("change")
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
    // Add saving invoices to DB here
    console.log("saved to database")
    this.setState({
      invoiceToEdit : "",
      displayedComponent : "invoicesList"
    });
  }


  deleteInvoice = (invoiceToDeleteId) => {
    const {invoices} = this.state;
    const updatedInvoices = invoices.filter(invoice =>{
      return invoice.id !== invoiceToDeleteId;
    })
    this.setState({
      invoices: updatedInvoices,
      displayedComponent : "invoicesList"
    });
  }


  changeDisplayedComponent = (displayedComponent) =>{
    if (displayedComponent==="addInvoice"){
      this.createNewInvoice();
    }
    this.setState({
      displayedComponent : displayedComponent
    })
  }


  renderCurrentDisplayedComponent = () =>{
    let component;
    const {displayedComponent} = this.state;
    switch (displayedComponent) {
      case "invoicesList":
        component = <InvoicesList viewInvoice={this.viewInvoice} setInvoiceToEdit={this.setInvoiceToEdit} deleteInvoice={this.deleteInvoice} invoices={this.state.invoices}/>;
        break;
      case "addInvoice":
        component = <AddInvoice calculateSubTotal={this.calculateSubTotal} addCreatedInvoiceToList={this.addCreatedInvoiceToList} deleteService={this.deleteServiceFromInvoiceToEdit} addService={this.addServiceToInvoiceToEdit} changeInvoiceToEdit={this.changeInvoiceToEdit} invoiceToEdit={this.state.invoiceToEdit}/>;
        break;
      case "editInvoice":
        component = <EditInvoice calculateSubTotal={this.calculateSubTotal} deleteServiceFromInvoice={this.deleteServiceFromInvoiceToEdit} saveChanges={this.saveChanges} addService={this.addServiceToInvoiceToEdit} changeInvoiceToEdit={this.changeInvoiceToEdit} invoiceToEdit={this.state.invoiceToEdit}/>;
        break;
      case "viewInvoice":
        component = <ViewInvoice invoiceToEdit={this.state.invoiceToEdit} setInvoiceToEdit={this.setInvoiceToEdit} changeTogle={this.changeDisplayedComponent}/>;
      break;
      case "statistics":
        component = <Statistics/>
      break;
      default:
        component = <MyAccount changeTogle={this.changeDisplayedComponent}/>
      break;
    }
    return component;
  }


  render() {
    return (
      <div className="App">
        <Navbar changeTogle={this.changeDisplayedComponent}/>
        {this.renderCurrentDisplayedComponent()}
      </div>
    );
  }
}

export default App;