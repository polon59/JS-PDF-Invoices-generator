import React from 'react';
import TextField from '@material-ui/core/TextField';


const InvoiceSummary = (props) =>{
    const {subTotal,salesTax,salesTaxVal,totalDue} = props.invoiceToEdit;
    return (
        <div className="invoice-summary">
            <div>
        <table>
            <tbody>
                <tr>
                    <td>SUBTOTAL:</td>
                    <td>{subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>SALES TAX %:</td>
                    <td>
                        <TextField
                        id="salesTax"
                        value={salesTax}
                        onChange={props.handleChange}
                        margin="none"
                        type="number"
                        InputProps={{ inputProps: { min: 0, step:0.01} }}
                        required
                        />
                    </td>
                </tr>
                <tr>
                    <td>SALES TAX:</td>
                    <td>{salesTaxVal.toFixed(2)}</td>
                </tr>
                <tr className='totalDueCell'>
                    <td><h4>TOTAL DUE:</h4></td>
                    <td><h4>{totalDue.toFixed(2)}</h4></td>
                </tr>
            </tbody>
        </table>
        </div>
        </div>
    );
}

export default InvoiceSummary;