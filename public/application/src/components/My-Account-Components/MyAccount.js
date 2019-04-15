import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import AccountOptions from './AccountOptions';

const styles ={
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
        backgroundColor: 'purple',
        color:'white'
    },
  };

class MyAccount extends Component{

    render(){
        return(
        <div>
            <Paper style={styles.paper}>
                <Grid container justify="center" alignItems="center" spacing={24}>
                    <Grid item sm={2} xs={3}>
                        <Avatar style={styles.avatar}>MP</Avatar>
                    </Grid>
                    <Grid item sm={3} xs={9}>
                        <p>Mariusz Pudzianowski</p>
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <p>
                            Welcome! this is some text added to look like it is nessesary, but honestly i added it to 
                            fill this empty space
                        </p>
                    </Grid>
                </Grid>
            </Paper>
            <AccountOptions/>
        </div>
        );
    }
}
export default MyAccount;