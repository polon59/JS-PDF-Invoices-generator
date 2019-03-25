import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class InvoicesList extends Component{

    renderInvoicesList(){
        const {deleteInvoice,changeCurrentInvoice,invoices} = this.props;
        const invoicesList = invoices.map((invoice,index) =>{
            let loc = "online"
            if (invoice.isOffline) {
                loc = "offline"
            }
            return (
                <tr key={invoice.id}>
                    <td>{index+1}</td>
                    <td>{loc}</td>
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
        return invoicesList;
    }
    

    render(){
        const { invoices } = this.props;
        const invoicesList = this.renderInvoicesList();
        if (invoices.length > 0){
            return(
                <div className="bordered">
                    <table>
                        <thead>
                            <tr>
                                <th>no.</th>
                                <th>LOCATION</th>
                                <th>ID in DB</th>
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
                    <h3>You have no invoices</h3>
                </div>
            )
        }
    } 
}

export default InvoicesList;