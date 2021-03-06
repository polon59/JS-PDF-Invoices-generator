import React, { Component } from 'react';
import ViewServices from './ViewServices';
import ViewInvoiceSummary from './ViewInvoiceSummary';
import PDFGenerator from './PDF-generators/PDFGenerator';
import Paper from '@material-ui/core/Paper';
import logo from '../../resources/images/logo.png';
import Grid from '@material-ui/core/Grid';
import ButtonMenu from './ButtonMenu';
import NoInvoiceChosenMessage from '../common/NoInvoiceChosenMessage';


const styles ={
    root: {
      flexGrow: 1,
    },
    container:{
      marginTop:40,
      height:'100%'
    },
    item:{
      height:'100%'
    },
    paper: {
      display: 'inline-block',
      boxSizing: 'border-box',
      width: 795,
      maxWidth: '100%',
      minHeight:1000,
      backgroundColor: 'white',
      padding: 0,
      color: 'black',
    },
    pdfContent:{
        padding:10
    },
    invoiceHeader:{
        margin:0,
        backgroundColor:'rgb(52, 109, 245)',
    },
    dateContainer:{
        paddingLeft:'10%'
    },
    headerContainer:{
        marginTop:5,
        color:'white'
    },
    invoiceLogo:{
        width:70,
        height:70
    },
    logoDesc:{
        color:'white',
        margin:0
    },
    bills:{
        whiteSpace: 'pre-line',
    },
    billFrom:{
        width:'80%'
    },
    billTo:{
        width:'80%'
    },
    title:{
        width:'80%'
    },
    date:{
        width:'80%'
    }
  };

class ViewInvoice extends Component{

    generatePDFFromInvoice = ()=>{   
        const generator = new PDFGenerator();
        generator.generateDocument();
    }

    render(){
        const {invoiceToEdit,changeCurrentInvoice} = this.props;
        if (invoiceToEdit === "") {
            return (
               <NoInvoiceChosenMessage/>
            )
        }

        const {id,title,date,billFrom,billTo,services} = invoiceToEdit;
        
        return(
        <div className="editInvoice-wrapper">
            <Paper style={styles.paper}>
                <div style={styles.pdfContent} id="PDF-Content">
                    <Paper style={styles.invoiceHeader}>
                        <Grid style={styles.headerContainer} container spacing={24}>
                            <Grid item sm={5} xs={12}>
                                <img style={styles.invoiceLogo} src={logo} alt="Your logo"/>
                                <h3 style={styles.logoDesc}>Your logo</h3>
                            </Grid>
                            <Grid  item sm={7} xs={12}>
                                <h4 style={styles.bills}>{billFrom}</h4>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Grid style={styles.container} container spacing={24}>
                        <Grid style={styles.dateContainer} item sm={5} xs={12}>
                            <h3 className='viewInvoiceContainer'>{title}</h3>
                            <br/>
                            <h4 className='viewInvoiceContainer'>{date}</h4>
                        </Grid>
                        <Grid item sm={7} xs={12}>
                            <h4 style={styles.bills}>{billTo}</h4>
                        </Grid>
                    </Grid>

                    <div className="invoice-services">
                    <ViewServices services={services}/>
                </div>
                <div className="invoice-summary">
                    <ViewInvoiceSummary invoiceToEdit={invoiceToEdit}/>
                </div>
                </div>
                <ButtonMenu 
                    generatePDFFromInvoice={this.generatePDFFromInvoice}
                    id={id}
                    changeCurrentInvoice={changeCurrentInvoice}
                />
            </Paper>
        </div>
        )
    }
}

export default ViewInvoice;