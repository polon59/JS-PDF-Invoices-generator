import React from 'react'

const ViewInvoiceSummary = (props) =>{
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
                        <td>{salesTax}</td>
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
    );
}

export default ViewInvoiceSummary;