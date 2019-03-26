import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function StillLoading(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} />
      <h3>Loading data...</h3>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}

StillLoading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StillLoading);