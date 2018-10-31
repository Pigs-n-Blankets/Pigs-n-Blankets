import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {me} from './store'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App

