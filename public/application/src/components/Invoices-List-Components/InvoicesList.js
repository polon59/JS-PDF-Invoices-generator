import React, { Component } from 'react';
import InvoiceListCell from './InvoiceListCell';
import Paper from '@material-ui/core/Paper';

const styles ={
    paper: {
      backgroundColor: 'rgb(24, 24, 35)',
      padding: 20,
      color: 'inherit',
    },
  };

class InvoicesList extends Component{

    renderTableBody(){
        const {deleteInvoice,changeCurrentInvoice,invoices} = this.props;
        return invoices.map((invoice,index) =>{
            return (
                <InvoiceListCell 
                    key={index}
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
                <Paper style={styles.paper}>
                    <table className='invoicesTable'>
                        <thead>
                            <tr className='invoicesTableHead'>
                                <th>no.</th>
                                <th>LOCATION</th>
                                <th>ID in DB</th>
                                <th>DATE</th>
                                <th>TITLE</th>
                                <th>BILL TO</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {tableBody}
                        </tbody>
                    </table>
                </Paper>
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