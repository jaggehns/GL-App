import React from 'react'
import { makeStyles } from '@material-ui/core'
import './App.css'
import Header from './components/Header/Header'
import PokeContainer from './container/PokeContainer/PokeContainer'

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh',
      maxWidth: '100%',
    },
  }))

  const classes = useStyles()
  return (
    <div className={classes.App}>
      <Header />
      <PokeContainer />
    </div>
  )
}

export default App
