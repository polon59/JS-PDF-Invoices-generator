import React, { Component } from 'react';
import Delete from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



const styles = {
    deleteButton: {
      backgroundColor: 'white',
      borderRadius: 3,
      color: 'gray',
    },
    textField:{
        width:'95%'
    }
  };

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
            <td>{this.props.index+1}</td>
            <td> 
                <TextField
                id="description"
                styles={styles.textField}
                value={description}
                onChange={this.handleChange}
                margin="none"
                />
            </td>
            <td>
                <TextField
                id="quantity"
                styles={styles.textField}
                value={quantity}
                onChange={(e)=>{this.handleChange(e); this.props.calculateSubTotal()}}
                margin="none"
                type="number"
                required
                />
            </td>
            <td>
                <TextField
                id="unitPrice"
                styles={styles.textField}
                value={unitPrice}
                onChange={(e)=>{this.handleChange(e); this.props.calculateSubTotal()}}
                margin="none"
                type="number" step="0.01"
                required
                />
            </td>
            <td>
                {total.toFixed(2)}
            </td>
            <td>
                <Tooltip TransitionComponent={Zoom} title='Delete this service'>
                    <Button 
                        style={styles.deleteButton}
                        variant="contained"
                        size="small"
                        color='inherit' 
                        onClick={()=>{this.props.handleDelete(id)}}
                    >
                        <Delete/>
                    </Button>
                </Tooltip>
            </td>
        </tr>

          
        );
    }
}

export default ServiceComponent;