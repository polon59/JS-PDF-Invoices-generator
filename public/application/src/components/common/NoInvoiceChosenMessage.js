import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Info from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    marginTop: 100,
    flexGrow: 1,
  },
  warningIcon:{
    color: 'rgb(232, 193, 20)',
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
  }
});

function NoInvoiceChosenMessage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
                <Grid item sm={2} xs={12}>
                        <VisibilityOff className={classes.warningIcon}/>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <h3>Error: No invoice chosen.</h3>
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
                    <h4>
                        Please select invoice from invoices list.
                    </h4>
                </Grid>
              </Grid>
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}

NoInvoiceChosenMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoInvoiceChosenMessage);