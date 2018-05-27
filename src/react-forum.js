import React, { Component } from 'react'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux'

import './styles/index.css'
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

  render(){
    return(
      <Provider store={store}>
        <Forum {...this.props}/>
      </Provider>
    )
  }

}

export default ReactForum
