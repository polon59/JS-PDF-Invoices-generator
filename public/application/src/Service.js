import React, { Component } from 'react';

class Service extends Component{
    state = {
        service : this.props.service
    }

    handleChange = (e) => {
        let name = e.target.id;
        let newValue = e.target.value;

        let service = this.state.service;
        service[name] = newValue;

        this.setState({
            service : service
        })
    }

    render(){
        const { service } = this.state;
        return (
            <tr>
                <td>
                    {service.id}
                </td>
                <td>
                    <input type="text" id="description" value={service.description} onChange={this.handleChange}/>
                </td>
                <td>
                    <input type="number" id="quantity" value={service.quantity} onChange={(e)=>{this.handleChange(e); this.props.calculateSubTotal()}}/>
                </td>
                <td>
                    <input type="number" id="unitPrice" value={service.unitPrice} onChange={(e)=>{this.handleChange(e); this.props.calculateSubTotal()}}/>
                </td>
                <td>
                    <h5 onClick={()=>{this.props.handleDelete(service.id)}}>delete</h5>
                </td>
            </tr>
        );
    }
}

export default Service;