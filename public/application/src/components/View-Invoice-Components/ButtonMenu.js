import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import Create from '@material-ui/icons/Create';

const styles ={
    icon:{
        marginRight:5
    }
}

class ButtonMenu extends React.Component{

    render(){
        const {generatePDFFromInvoice, id} = this.props;
        return(
            <div>
                <Button variant="outlined" onClick={generatePDFFromInvoice}>
                    <PictureAsPdf style={styles.icon}/>
                    Download in PDF
                </Button>
                <Button 
                    component={Link} 
                    to={`/myInvoices/editInvoice/${id}`} 
                    variant="outlined" 
                >
                    <Create style={styles.icon}/>
                    Edit this Invoice
                </Button>
                    
            </div>
        )
    }
}
export default ButtonMenu;