import React, { Component } from 'react';
import Navbar from './components/Navbar-Components/navbar';
import './App.css';
import InvoicesList from './components/Invoices-List-Components/InvoicesList';
import AddInvoice from './components/Add-Invoice-Components/AddInvoice';
import EditInvoice from './components/Edit-Invoice-Components/EditInvoice';
import MyAccount from './components/My-Account-Components/MyAccount';
import StatisticsPanel from './components/Statistics-Components/StatisticsPanel';
import ViewInvoice from './components/View-Invoice-Components/ViewInvoice';
import DBAccess from './DBAcces/DBAcces';
import Invoice from './model/invoice';
import OfflineDAO from './DBAcces/offline-script/OfflineDAO';
import InvoiceCalculations from './model/invoiceCalculations';
import {BrowserRouter as Router,Route} from 'react-router-dom';

class App extends Component {
  
  constructor(){
    super();
    this.DBAccess = new DBAccess(this);
    this.offlineDAO = new OfflineDAO(this.DBAccess);
    this.invoiceCalculator = new InvoiceCalculations();
    this.state = {
      invoices : [],
      invoiceToEdit : "",
    }
    this.initializeInvoices();
  }

  initializeInvoices = () =>{
    // change first to checkConnection()
        this.DBAccess.getInvoicesFromDB()
        .then(invoices=>{
          this.offlineDAO.sendStoredDataToDB()
          .then(()=>{
            this.DBAccess.getInvoicesFromDB()
            .then(invoices=>
              {this.updateLocalInvoicesList(invoices)})
          })
        })
        .catch(err=>{
          this.getInvoicesFromLocalStorage();
        })
  }

  getInvoicesFromLocalStorage = () =>{
    alert("You are in offline mode Invoices loaded from LS");
    let localInvoices = this.offlineDAO.getInvoicesListSavedLocally();
    this.updateLocalInvoicesList(localInvoices);
  }

  createNewInvoice = () =>{
    let newInvoice = new Invoice();
    this.saveEditedInvoice(newInvoice)
    return newInvoice;
  }

  addCreatedInvoiceToList = () =>{
    let invoiceToAdd = this.state.invoiceToEdit;
    let invoices = this.state.invoices;
    this.DBAccess.addInvoiceToDB(invoiceToAdd).then(lastID => {
      invoiceToAdd.id = lastID;
    }).catch(err =>{
      this.offlineDAO.addDataToSave(invoiceToAdd,'add');
      invoiceToAdd.isOffline = true;
    }).then(()=>{
      invoices.push(invoiceToAdd);
      this.updateLocalInvoicesList(invoices);
    });
  }

  addServiceToInvoiceToEdit = (newService) =>{
    const {invoiceToEdit} = this.state;
    invoiceToEdit.services.push(newService);
    this.saveEditedInvoice(invoiceToEdit);
  }

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
    let updatedInvoiceToEdit = this.invoiceCalculator.calculateSubTotal(invoiceToEdit)
    this.saveEditedInvoice(updatedInvoiceToEdit);
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
    let updatedInvoiceToEdit = this.invoiceCalculator.calculateChangedTax(invoiceToEdit,newSalesTax)
    this.saveEditedInvoice(updatedInvoiceToEdit);
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
    const updatedInvoice = this.state.invoiceToEdit;
    this.DBAccess.updateInvoice(updatedInvoice).catch(err =>{
      this.offlineDAO.addDataToSave(updatedInvoice,'update');
    });
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
    this.DBAccess.deleteInvoiceFromDB(invoiceToDeleteId).catch(err=>{
      this.offlineDAO.addDataToSave(invoiceToDeleteId,'delete');
    });
  }

  render() {
    const {invoiceToEdit,invoices} = this.state;
    return (
        <Router>
        <div className="container">
          <Navbar/>
          <Route exact path="/" component={MyAccount}/>
          <Route 
            path="/statistics"
            render={(props) => 
              <StatisticsPanel 
                DBAccess={this.DBAccess} 
              />}
          />
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