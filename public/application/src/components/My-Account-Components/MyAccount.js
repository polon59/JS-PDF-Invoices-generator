import React, { Component } from 'react';
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
  };

class MyAccount extends Component{

    render(){
        return(

    <div>
            <Grid container alignContent='center' spacing={24}>
                <Paper style={styles.paper}>
                    <Grid item  sm={3} xs={12}>
                        <p>logo</p>
                    </Grid>

                    <Grid item sm={9} xs={12}>
                        <p>name of user</p>
                    </Grid>

                    <Grid item sm={12} xs={12}>
                        <p>
                            Welcome! this is some text added to look like it is nessesary, but honestly i added it to 
                            fill this empty space
                        </p>
                    </Grid>
                </Paper>

                <Paper style={styles.paper}>
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
                </Paper>

            </Grid>
    </div>

        );
    }
}

export default MyAccount;