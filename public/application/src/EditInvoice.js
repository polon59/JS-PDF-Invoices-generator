import React, { Component } from 'react';

class EditInvoice extends Component{

    state = {
        id : this.props.invoiceToEdit.id,
        title: this.props.invoiceToEdit.title,
        billTo: this.props.invoiceToEdit.billTo
    }


    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.updateInvoice(this.state);
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
                        <label htmlFor="title">BillTo</label>
                        <input type="text" id="billTo" value={this.props.invoiceToEdit.billTo} onChange={this.handleChange}/>
                        <button>Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default EditInvoice;