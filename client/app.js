import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {connect} from 'react-redux'
import {me} from './store'


// class App extends React.Component {
//   componentDidMount() {
//     this.props.fetchInitialUser()
//   }

//   render() {
//     console.log()
//     return(
//       <div>
//         <Navbar />
//         <Routes />
//       </div>
//     )
//   }
// }


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     user: state.user
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     fetchInitialUser: () => dispatch(me())
//   }
// }

export default App
// export default connect(mapStateToProps, mapDispatchToProps)(App)
