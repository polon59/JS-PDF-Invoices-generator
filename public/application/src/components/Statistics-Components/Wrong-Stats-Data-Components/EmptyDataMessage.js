import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NotInterested from '@material-ui/icons/NotInterested';
import Info from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  warningIcon:{
    color: 'rgb(204, 204, 0)',
    height:'100%',
    fontSize: 40
  },
  infoIcon:{
    color: 'rgb(0, 102, 255)',
    height:'100%',
    fontSize: 40
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    backgroundColor: 'rgb(24, 24, 35)',
    color: 'inherit',
  },
  paperIcon:{
    textAlign: 'center',
    height: '100%',
    backgroundColor: 'rgb(38, 35, 53)'
  },
  button: {
    margin: theme.spacing.unit,
    textTransform:'none'
  }
});

function EmptyDataMessage(props) {
  const { classes,reason } = props;

  let warningMessage = 'You have no active invoices. Statistics data cannot be displayed.';
  let infoMessage = 'Add new invoice with at least one service, to display statistics.';
  let linkDestination = '/addInvoice';
  
  if (reason==="noServices"){
    warningMessage = 'Your invoices from selected year have no services. Statistics data cannot be displayed.'
    infoMessage = `Add at least one service to existing invoice from this year, or create new invoice,
    to display statistics.`
    linkDestination = '/myInvoices';
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
                <Grid item sm={2} xs={12}>
                        <NotInterested className={classes.warningIcon}/>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <h4>{warningMessage}</h4>
                </Grid>
              </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
                <Grid item sm={2} xs={12}>
                        <Info className={classes.infoIcon}/>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <Button 
                        component={Link} 
                        to={linkDestination} 
                        variant="outlined" 
                        color="inherit" 
                        className={classes.button}
                    >
                        {infoMessage}
                    </Button>
                </Grid>
              </Grid>
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}

EmptyDataMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmptyDataMessage);