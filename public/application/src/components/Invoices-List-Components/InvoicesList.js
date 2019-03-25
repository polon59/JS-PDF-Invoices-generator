import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import InvoiceListCell from './InvoiceListCell';

class InvoicesList extends Component{

    renderTableBody(){
        const {deleteInvoice,changeCurrentInvoice,invoices} = this.props;
        return invoices.map((invoice,index) =>{
            return (
                <InvoiceListCell 
                    changeCurrentInvoice={changeCurrentInvoice}
                    deleteInvoice={deleteInvoice}
                    invoice={invoice}
                    index={index}
                />
            );
        });
    }
    

    render(){
        const { invoices } = this.props;
        const tableBody = this.renderTableBody();
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
                        {tableBody}
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