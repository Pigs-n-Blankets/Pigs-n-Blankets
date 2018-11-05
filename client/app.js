import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {me} from './store'
import CssBaseline from '@material-ui/core/CssBaseline';


const App = () => {
  return (

    <div>
      <CssBaseline />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App

