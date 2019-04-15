import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Assessment from '@material-ui/icons/Assessment';
import ViewList from '@material-ui/icons/ViewList';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

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
        transition:'0.3s ease'
    },
    link:{
        textDecoration:'none'
    },
    optIcon:{
        fontSize:70,
    }
  };

const AccountOptions = (props) =>{
    return (
        <Paper style={styles.paper}>
            <Grid container spacing={40}>

                <Grid  item sm={4} xs={12}>
                    <Link to='/myInvoices' style={styles.link}>
                        <Paper style={styles.accountOption} className='accountOption'>
                            <PlaylistAdd style={styles.optIcon}/>
                            <h4>View current invoices</h4>
                        </Paper>
                    </Link>
                </Grid>

                <Grid  item sm={4} xs={12}>
                    <Link to='/addInvoice' style={styles.link}>
                        <Paper style={styles.accountOption} className='accountOption'>
                            <ViewList style={styles.optIcon}/>
                            <h4>Create new invoice</h4>
                        </Paper>
                    </Link>
                </Grid>

                <Grid  item sm={4} xs={12}>
                    <Link to='/statistics' style={styles.link}>
                        <Paper style={styles.accountOption} className='accountOption'>
                            <Assessment style={styles.optIcon}/>
                            <h4>View statistics</h4>
                        </Paper>
                    </Link>
                </Grid>

            </Grid>
        </Paper>
    )

}

export default AccountOptions;