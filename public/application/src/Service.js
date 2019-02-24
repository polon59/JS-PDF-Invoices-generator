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
                    <input id="description" value={service.description} onChange={this.handleChange}/>
                </td>
                <td>
                    <input id="quantity" value={service.quantity} onChange={this.handleChange}/>
                </td>
                <td>
                    <input id="unitPrice" value={service.unitPrice} onChange={this.handleChange}/>
                </td>
                <td>
                    <input id="tax" value={service.tax} onChange={this.handleChange}/>
                </td>
                <td>
                    <h5 onClick={()=>{this.props.handleDelete(service.id)}}>delete</h5>
                </td>
            </tr>
        );
    }
}

export default Service;