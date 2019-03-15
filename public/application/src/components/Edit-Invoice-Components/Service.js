import React, { Component } from 'react';

class ServiceComponent extends Component{
    state = {
        service : this.props.service
    }

    handleChange = (e) => {
        const name = e.target.id;
        const newValue = e.target.value;
        let service = this.state.service;
        service[name] = newValue;
        if (name !== "description") {
            service = this.calculateTotalServiceCost(service);
        }
        this.setState({
            service : service
        })
    }

    calculateTotalServiceCost = (service)=>{
        const {quantity, unitPrice} = service;
        service.total = unitPrice * quantity;
        return service;
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
                    <input type="number" id="quantity" value={service.quantity} min='0' onChange={(e)=>{this.handleChange(e); this.props.calculateSubTotal()}}/>
                </td>
                <td>
                    <input type="number" step="0.01" id="unitPrice" value={service.unitPrice} min='0' onChange={(e)=>{this.handleChange(e); this.props.calculateSubTotal()}}/>
                </td>
                <td>
                    {service.total}
                </td>
                <td className="clickable" onClick={()=>{this.props.handleDelete(service.id)}}>
                    remove
                </td>
            </tr>
        );
    }
}

export default ServiceComponent;