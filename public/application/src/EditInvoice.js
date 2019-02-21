import React, { Component } from 'react';
import Services from './Services';

class EditInvoice extends Component{

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.updateInvoicesList();
    }


    handleChange = (e) => {
        this.props.changeInvoiceToEdit(e);
    }


    render(){
        if(this.props.invoiceToEdit === ""){
            return(
                <div className="bordered">
                    <h3>No invoice to edit chosen</h3>
                </div>
            )
        }
        else{
            return(
                <div className="bordered">
                    <h3>EDIT INVOICE</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={this.props.invoiceToEdit.title} onChange={this.handleChange}/>
                        <label htmlFor="title">Bill to:</label>
                        <input type="text" id="billTo" value={this.props.invoiceToEdit.billTo} onChange={this.handleChange}/>
                        <label htmlFor="title">Bill from:</label>
                        <input type="text" id="billFrom" value={this.props.invoiceToEdit.billFrom} onChange={this.handleChange}/>
                        <label htmlFor="title">Services:</label>
                        <Services services={this.props.invoiceToEdit.services}/>
                        {/* <input type="text" id="services" value={this.props.invoiceToEdit.services} onChange={this.handleChange}/> */}
                        <button>Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default EditInvoice;