import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class ButtonMenu extends React.Component{

    render(){
        const {generatePDFFromInvoice, changeCurrentInvoice, id} = this.props;
        return(
            <div>
                <Button variant="outlined" onClick={generatePDFFromInvoice}>
                    Download in PDF
                </Button>
                <Button 
                    component={Link} 
                    to={`/myInvoices/editInvoice/${id}`} 
                    variant="outlined" 
                >
                    Edit this Invoice
                </Button>
                    
            </div>
        )
    }
}
export default ButtonMenu;