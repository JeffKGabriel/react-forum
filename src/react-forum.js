import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux'

import './styles/index.css'
import {ref, fbdb, firebaseAuth} from './firebase.config.js'
import forum from './reducers/forum.js'

import Forum from './components/Forum'

const store = createStore(
  combineReducers({
    //reducer,
    forum
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

class ReactForum extends Component{

  constructor (props) {
    super(props)
  }

  componentDidMount(){
    console.log('mounted')
    let app = 'ytradio'
    fbdb.ref('forum/'+app).once('value')
      .then(snap=>{
        let snapVal = snap.val()
        console.log('snapVal',snapVal)
      })
      .catch(err=>{
        console.log('error',err)
      })
  }

  render(){
    return(
      <Provider store={store}>
        <Forum/>
      </Provider>
    )
  }

}

export default ReactForum
