import React from 'react'
import {Link} from 'react-router-dom';
import MemoryLocation from '../common/MemoryLocation';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';


const styles = {
    editButton: {
      backgroundColor: 'rgb(33, 41, 56)',
      borderRadius: 3,
      color: 'gray',
    },
  };

const InvoiceListCell = (props) =>{
    const {classes,changeCurrentInvoice,deleteInvoice,invoice,index} = props;

    return (
        <tr key={invoice.id}>
            <td>{index+1}</td>
            <td><MemoryLocation isOffline={invoice.isOffline}/></td>
            <td>{invoice.id}</td>
            <td>{invoice.date}</td>
            <td>{invoice.title}</td>
            <td>{invoice.billTo}</td>
            <td>
                <Button 
                    style={styles.editButton}
                    component={Link} to={`/myInvoices/editInvoice/${invoice.id}`}
                    variant="contained"
                    size="small"
                    color='inherit' 
                    onClick={()=>{changeCurrentInvoice(invoice.id)}}
                >
                    EDIT
                </Button>
            </td>
            <td>
                <Button 
                    style={styles.editButton}
                    component={Link} to={`/myInvoices/viewInvoice/${invoice.id}`}
                    variant="contained"
                    size="small"
                    color='inherit' 
                    onClick={()=>{changeCurrentInvoice(invoice.id)}}
                >
                    VIEW
                </Button>
            </td>
            <td>
                <Tooltip TransitionComponent={Zoom} title='Delete this invoice'>
                    <Button 
                        style={styles.editButton}
                        variant="contained"
                        size="small"
                        color='inherit' 
                        onClick={()=>{deleteInvoice(invoice.id)}}
                    >
                        <Delete/>
                    </Button>
                </Tooltip>
            </td>
        </tr>
    )
}

export default InvoiceListCell;