import React, { Component } from 'react';

class EditInvoice extends Component{
    state = {
        title: null,
        billTo: null
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.addInvoice(this.state);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={this.handleChange}/>
                    <label htmlFor="title">BillTo</label>
                    <input type="text" id="billTo" onChange={this.handleChange}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default EditInvoice;