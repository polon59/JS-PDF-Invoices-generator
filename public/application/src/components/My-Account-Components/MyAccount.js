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
        backgroundColor: 'purple',
        color:'white'
    },
  };

class MyAccount extends Component{

    render(){

        return(
        <div style={styles.root}>

            <AccountOptions/>

            <Paper style={styles.paper}>
                <Grid container justify="center" alignItems="center" spacing={24}>
                    <Grid item sm={2} xs={3}>
                        <Avatar style={styles.avatar}>MP</Avatar>
                    </Grid>
                    <Grid item sm={3} xs={9}>
                        <p>Mariusz Pudzianowski</p>
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <h4>Welcome!</h4>
                        <p>
                            This is some text added to look like it is nessesary, but honestly i added it to 
                            fill this empty space.
                        </p>
                    </Grid>
                </Grid>
            </Paper>

            <ModeInfo props={this.props}/>
            
        </div>
        );
    }
}
export default MyAccount;