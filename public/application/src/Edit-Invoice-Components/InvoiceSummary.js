import React from 'react';

const InvoiceSummary = (props) =>{
    const {subTotal,salesTax,salesTaxVal,totalDue} = props.invoiceToEdit;
    return (
        <div className="invoice-summary">
        <table>
            <tbody>
                <tr>
                    <td>SUBTOTAL:</td>
                    <td>{subTotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>SALES TAX %:</td>
                    <td><input type="number" step="0.01" min="0" max="100" id="salesTax" value={salesTax} onChange={props.handleChange}/></td>
                </tr>
                <tr>
                    <td>SALES TAX:</td>
                    <td>{salesTaxVal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td><h4>TOTAL DUE:</h4></td>
                    <td><h4>{totalDue.toFixed(2)}</h4></td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export default InvoiceSummary;