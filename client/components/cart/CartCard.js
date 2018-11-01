import React from 'react';
import PropTypes from 'prop-types';

// MATERIAL UI IMPORTS
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  root: {
    // display: 'flex',
    // justifyContent: 'center',
    width: '100%',
  },

});

function CartCard(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        <List>
          <ListItem>
            <Avatar>
              <ImageIcon />
            </Avatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
          <li>
            <Divider inset />
          </li>
        </List>
    </div>
  );
}

CartCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CartCard);
