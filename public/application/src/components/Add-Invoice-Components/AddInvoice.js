import React, { Component } from 'react';
import EditInvoice from '../Edit-Invoice-Components/EditInvoice';

class AddInvoice extends Component{
    constructor(){
        super();
        this.inv = "";
    }

    handleSubmit = () =>{
        this.props.addCreatedInvoiceToList();
    }
    

    componentWillMount(){
        this.inv = this.props.createNewInvoice();
    }

    render(){
        const {deleteService,addService,changeInvoiceToEdit,calculateSubTotal,addCreatedInvoiceToList} = this.props;
        return(
            <EditInvoice deleteServiceFromInvoice={deleteService} 
            saveChanges={addCreatedInvoiceToList} 
            addService={addService} 
            calculateSubTotal={calculateSubTotal}
            changeInvoiceToEdit={changeInvoiceToEdit} 
            invoiceToEdit={this.inv}
            redirect='invoices'
            />
            
        )
    }
}

export default AddInvoice;