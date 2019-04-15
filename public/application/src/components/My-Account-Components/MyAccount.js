import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import AccountOptions from './AccountOptions';
import ModeInfo from './ModeInfo';

const styles ={
    root:{
        paddingTop:'3vw',
    },
    paper: {
      margin:10,
      backgroundColor: 'rgb(24, 24, 35)',
      padding: 20,
      maxWidth: '100%',
      overflow: 'auto',
      color: 'inherit',
    },
    avatar:{
        margin:'auto',
        backgroundColor: 'gray',
        color:'white'
    },
  };

class MyAccount extends Component{

    render(){

        return(
        <div style={styles.root}>
            <Paper style={styles.paper}>
                <Grid container justify="center" alignItems="center" spacing={24}>
                    <Grid item sm={2} xs={3}>
                        <Avatar style={styles.avatar}>MP</Avatar>
                    </Grid>
                    <Grid item sm={3} xs={9}>
                        <p>Mariusz Pudzianowski</p>
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <h3>Welcome!</h3>
                        <p>
                            Select one of options listed below, so You can create new invoice,
                            download it as PDF, display existing invoices or display statistics charts about
                            income, best customers, most lucrative services and more. 
                            Application can also work in offline mode - then all changes are temporarly saved 
                            in Local Storage and automatically sent to server after connection is recovered.
                        </p>
                    </Grid>
                </Grid>
            </Paper>

            <AccountOptions/>
            
            <ModeInfo props={this.props}/>
            
        </div>
        );
    }
}
export default MyAccount;