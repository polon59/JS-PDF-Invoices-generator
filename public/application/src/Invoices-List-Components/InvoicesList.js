import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';

const InvoicesList = (props)=>{
    const { invoices } = props;
    if (invoices.length > 0){
        const { deleteInvoice,viewInvoice } = props;
        const invoicesList = invoices.map(invoice =>{
            return (
                <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{invoice.title}</td>
                    <td>{invoice.billTo}</td>
                    <td><button onClick={()=>{props.setInvoiceToEdit(invoice.id)}}>EDIT</button></td>
                    <td><Link to="/ViewInvoice"><button onClick={()=>{viewInvoice(invoice.id)}}>VIEW</button></Link></td>
                    <td><button onClick={()=>{deleteInvoice(invoice.id)}}>X</button></td>
                </tr>
            );
        });
        return(
            <div className="bordered">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TITLE</th>
                            <th>BILL TO</th>
                        </tr>
                    </thead>
                    <tbody>
                    {invoicesList}
                    </tbody>
                </table>
                
            </div>
        );
    }
    else{
        return (
            <div className="bordered">
                <h3>You have no active invoices</h3>
            </div>
        )
    }
    
}

export default InvoicesList;