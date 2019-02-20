import React, { Component } from 'react';

class EditInvoice extends Component{
    state = {
        title: this.props.invoiceToEdit.title,
        billTo: this.props.invoiceToEdit.billTo
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.updateInvoice(this.state);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
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
                        <input type="text" id="title" value={this.state.title} onChange={this.handleChange}/>
                        <label htmlFor="title">BillTo</label>
                        <input type="text" id="billTo" value={this.state.billTo} onChange={this.handleChange}/>
                        <button>Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default EditInvoice;