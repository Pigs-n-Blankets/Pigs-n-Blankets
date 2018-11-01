import React from 'react'
import {connect} from 'react-redux'

// MATERIAL UI IMPORTS
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Stars from '../review/Stars'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 'auto'
  },
  card: {
    display: 'flex',
    width: '68vw',
    height: '50vh',
    boxShadow: 'none',
    border: '1px solid #D8DEE2'
  },
  details: {
    flexBasis: '50%',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  profileImg: {
    flexBasis: '50%',
  },
  expansionPanel: {
    boxShadow: 'none',
    borderTop: 'none',
  },
  submit: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit*2

  },
  gutter: {
    marginBottom: theme.spacing.unit*2,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

function SingleProductCard(props) {
  const {classes, product} = props
  const {name, rating, imgUrl, description, price} = product

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia className={classes.profileImg} image={imgUrl} />

        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h4" component="h4" className={classes.gutter}>
              {name}
            </Typography>
            <Stars rating={rating} />
            <Typography gutterBottom variant="h6" className={classes.gutter}>
              {`$${price}`}
            </Typography>

            <ExpansionPanel className={classes.expansionPanel}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography gutterBottom >
                  Description
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>


          </CardContent>
        </div>
      </Card>
      <CardActions className={classes.cardActions}>
        {props.user.isAdmin ? (
          <React.Fragment>
          <Button
          type="button"
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          EDIT
          <EditIcon className={classes.rightIcon}/>
        </Button>
          <Button
          type="button"
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          DELETE
          <DeleteIcon className={classes.rightIcon}/>
        </Button>
        </React.Fragment>
        ) : (
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          ADD TO CART
        </Button>
        )}
      </CardActions>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

SingleProductCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapState)(SingleProductCard))