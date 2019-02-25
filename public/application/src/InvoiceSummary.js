import React from 'react';

const InvoiceSummary = (props) =>{
    const {subTotal,salesTax,salesTaxVal,totalDue} = props.invoiceToEdit;
    return (
        <table>
            <tbody>
                <tr>
                    <td>SUBTOTAL:</td>
                    <td>{subTotal}</td>
                </tr>
                <tr>
                    <td>SALES TAX %:</td>
                    <td><input type="number" min="0" max="100" id="salesTax" value={salesTax} onChange={props.handleChange}/></td>
                </tr>
                <tr>
                    <td>SALES TAX:</td>
                    <td>{salesTaxVal}</td>
                </tr>
                <tr>
                    <td><h4>TOTAL DUE:</h4></td>
                    <td><h4>{totalDue}</h4></td>
                </tr>
            </tbody>
        </table>
    );
}

export default InvoiceSummary;