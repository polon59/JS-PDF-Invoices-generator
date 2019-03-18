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
        const { id,description,quantity,unitPrice,total } = this.state.service;
        return (
            <tr>
                <td>
                    {this.props.index+1}
                </td>
                <td>
                    {id}
                </td>
                <td>
                    <input type="text" id="description" value={description} onChange={this.handleChange}/>
                </td>
                <td>
                    <input type="number" id="quantity" value={quantity} min='0' onChange={(e)=>{this.handleChange(e); this.props.calculateSubTotal()}}/>
                </td>
                <td>
                    <input type="number" step="0.01" id="unitPrice" value={unitPrice.toFixed(2)} min='0' onChange={(e)=>{this.handleChange(e); this.props.calculateSubTotal()}}/>
                </td>
                <td>
                    {total.toFixed(2)}
                </td>
                <td className="clickable" onClick={()=>{this.props.handleDelete(id)}}>
                    remove
                </td>
            </tr>
        );
    }
}

export default ServiceComponent;