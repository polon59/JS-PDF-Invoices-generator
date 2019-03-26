import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DialogSelect from '../common/DialogSelect';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
      color: 'rgb(255, 255, 255)'
    },
    title:{
        height:'100%',
        margin:0,
        padding:5,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      backgroundColor: 'rgb(52, 109, 245)',
      color: 'inherit',
      minHeight:30
    },
  });

function StatisticsAppBar(props) {
  const { classes,title,dialogSelectTitle,changeYear,prepareYearsList } = props;

  return (
      <div className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
                <Grid item sm={7} xs={12}>
                    <h3 className={classes.title}>{title}</h3>
                </Grid>
                <Grid item sm={5} xs={12}>
                    <DialogSelect 
                        options={prepareYearsList()} 
                        title={dialogSelectTitle}
                        handleSubmit={changeYear}
                    />
                </Grid>
              </Grid>
          </Paper>
        </Grid>
      </div>
  );
}

StatisticsAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatisticsAppBar);