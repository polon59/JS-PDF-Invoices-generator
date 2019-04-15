import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles ={
    paper: {
      margin:10,
      backgroundColor: 'rgb(24, 24, 35)',
      padding: 20,
      maxWidth: '100%',
      overflow: 'auto',
      color: 'inherit',
    },
    accountBox:{
        backgroundColor:'black',
        height:'100%'
    }
  };

const AccountOptions = (props) =>{
    return (
        <Paper style={styles.paper}>
            <Grid container spacing={24}>
                <Grid  item sm={4} xs={12}>
                    <Link to='/myInvoices'>
                        <div className="optionBox bordered"><h4>View current invoices</h4></div>
                    </Link>
                </Grid>
                <Grid  item sm={4} xs={12}>
                    <Link to='/addInvoice'>
                        <div className="optionBox bordered"><h4>Create new invoice</h4></div>
                    </Link>
                </Grid>
                <Grid  item sm={4} xs={12}>
                    <Link to='/statistics'>
                        <div className="optionBox bordered"><h4>View statistics</h4></div>
                    </Link>
                </Grid>
            </Grid>
        </Paper>
    )

}

export default AccountOptions;