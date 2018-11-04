import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'


// MATERIAL UI IMPORTS

const styles = theme => ({
  root: {

  }
})

class Dashboard extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <div>DASHBOARD</div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard)
