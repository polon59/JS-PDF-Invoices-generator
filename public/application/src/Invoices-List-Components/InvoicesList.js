import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class InvoicesList extends Component{

    render(){
        const { invoices } = this.props;
        if (invoices.length > 0){
            const { deleteInvoice,changeCurrentInvoice } = this.props;
            const invoicesList = invoices.map(invoice =>{
                return (
                    <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.title}</td>
                        <td>{invoice.billTo}</td>
                        <td>
                            <Link to={`/myInvoices/editInvoice/${invoice.id}`}>
                                <button onClick={()=>{changeCurrentInvoice(invoice.id)}}>EDIT</button>
                            </Link>
                        </td>
                        <td>
                            <Link to={`/myInvoices/viewInvoice/${invoice.id}`}>
                                <button onClick={()=>{changeCurrentInvoice(invoice.id)}}>VIEW</button>
                            </Link>
                        </td>
                        <td>
                            <button onClick={()=>{deleteInvoice(invoice.id)}}>X</button>
                        </td>
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
}

export default InvoicesList;