import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Assessment from '@material-ui/icons/Assessment';
import OfflineBolt from '@material-ui/icons/OfflineBolt';

const styles ={
    paper: {
      margin:10,
      backgroundColor: 'rgb(24, 24, 35)',
      padding: 20,
      maxWidth: '100%',
      overflow: 'auto',
      color: 'inherit',
    },
    accountOption:{
        padding: 20,
        textAlign: 'center',
        backgroundColor:'rgb(52, 109, 245)',
        color: 'white',
        
    },
    link:{
        textDecoration:'none'
    }
  };

const AccountOptions = (props) =>{
    return (
        <Paper style={styles.paper}>
            <Grid container spacing={24}>

                <Grid  item sm={4} xs={12}>
                    <Link to='/myInvoices' style={styles.link}>
                        <Paper style={styles.accountOption}>
                            <h4>View current invoices</h4>
                        </Paper>
                    </Link>
                </Grid>

                <Grid  item sm={4} xs={12}>
                    <Link to='/addInvoice' style={styles.link}>
                        <Paper style={styles.accountOption}>
                            <h4>Create new invoice</h4>
                        </Paper>
                    </Link>
                </Grid>

                <Grid  item sm={4} xs={12}>
                    <Link to='/statistics' style={styles.link}>
                        <Paper style={styles.accountOption}>
                            <h4>View statistics</h4>
                        </Paper>
                    </Link>
                </Grid>

            </Grid>
        </Paper>
    )

}

export default AccountOptions;