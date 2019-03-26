import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NotInterested from '@material-ui/icons/NotInterested'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  icon:{
      height:'100%',
      color: 'rgb(204, 204, 0)',
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
  }
});

function EmptyDataMessage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
                <Grid item sm={2} xs={12}>
                    <Paper className={classes.paperIcon}>
                        <NotInterested className={classes.icon}/>
                    </Paper>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <h4>You have no active invoices. Statistics data cannot be displayed.</h4>
                </Grid>
              </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
                Add new invoice with at least one service, to display statistics for this year.
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