import React, { Component } from 'react';
import Services from './Services';
import InvoiceSummary from './InvoiceSummary';
import {withRouter} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TrendingUp from '@material-ui/icons/TrendingUp';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


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
      backgroundColor: 'white',
      padding: 10,
      color: 'black',
    },
    invoiceHeader:{
        margin:0,
        backgroundColor:'rgb(52, 109, 245)',
    },
    headerContainer:{
        margin:0
    },
    invoiceLogo:{
        color:'white',
        fontSize:150,
    },
  };


class EditInvoice extends Component{

    handleSubmit = (e) =>{
        e.preventDefault();
        const {redirect,invoiceToEdit,history,saveChanges} = this.props;
        if (redirect==='view') {
            history.push(`/myInvoices/viewInvoice/${invoiceToEdit.id}`);
        } else {
            history.push('/myInvoices');
        }   
        saveChanges();
    }

    handleChange = (e) => {
        this.props.changeInvoiceToEdit(e);
    }

    handleServiceDelete = (serviceId) =>{
        this.props.deleteServiceFromInvoice(serviceId);
    }

    resize = (target) =>{
        target.style.height = 'auto';
        target.style.height = target.scrollHeight+'px';
    }

    setInitialTextareasSize = () =>{
        let billfrom = document.getElementById("billFrom");
        let billto = document.getElementById("billTo");
        this.resize(billfrom);
        this.resize(billto);
    }

    componentDidMount(){
        if (this.props.invoiceToEdit !== "") {
            this.setInitialTextareasSize();
        }
    }

    render(){
        const {invoiceToEdit,calculateSubTotal,addService} = this.props;
        const {title,date,billTo,billFrom,services} = invoiceToEdit;
        if(invoiceToEdit === "" || invoiceToEdit === undefined){
            return(
                <div className="bordered">
                    <h3>No invoice to edit chosen</h3>
                </div>
            )
        }
        return(
            <Paper style={styles.paper}>
                <form onSubmit={this.handleSubmit}>
                    <Paper style={styles.invoiceHeader}>
                        <Grid style={styles.headerContainer} container spacing={24}>
                            <Grid style={styles.invoiceLogo} item sm={4} xs={12}>
                                <TrendingUp/>
                            </Grid>

                            <Grid item sm={8} xs={12}>
                            <TextField
                                id="billFrom"
                                label="Bill from"
                                placeholder="Who is this bill from?"
                                multiline
                                rowsMax="5"
                                value={billFrom}
                                onChange={(e)=>{this.handleChange(e);this.resize(e.target)}} 
                                margin="normal"
                                helperText="helper"
                                variant="filled"
                                required
                            />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Grid style={styles.container} container spacing={24}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                id="billTo"
                                label="Bill to"
                                placeholder="Who is this bill to?"
                                multiline
                                rowsMax="5"
                                value={billTo}
                                onChange={(e)=>{this.handleChange(e);this.resize(e.target)}} 
                                margin="normal"
                                helperText="helper"
                                variant="filled"
                                required
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                value={date} 
                                onChange={this.handleChange} 
                                InputLabelProps={{
                                shrink: true,
                                }}
                                required
                            />
                            <TextField
                                id="title"
                                label="Invoice title"
                                placeholder="Select invoice title or ID"
                                multiline
                                rowsMax="2"
                                value={title}
                                onChange={this.handleChange}
                                margin="normal"
                                helperText="hello"
                                variant="filled"
                            />

                        </Grid>
                    </Grid>
                    <Services 
                        handleServiceDelete={this.handleServiceDelete} 
                        calculateSubTotal={calculateSubTotal} 
                        handleChange={this.handleChange} 
                        addService={addService} 
                        services={services}
                    />
                    <InvoiceSummary invoiceToEdit={invoiceToEdit} handleChange={this.handleChange}/>               
                    <input type="submit" value="Save invoice"/>
                </form>
            </Paper>







        )
    }
}

export default withRouter(EditInvoice);