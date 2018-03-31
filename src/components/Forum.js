import React, { Component } from 'react'
import { connect } from 'react-redux'

import {test} from '../reducers/forum'

class Forum extends Component{

  constructor (props) {
    super(props)
  }

  componentDidMount(){
    this.props.dispatch(test('okkkk'))
  }

  render(){
    return(
      <div className='Forum-Box'>
        forum:)))
      </div>
    )
  }

}

export default connect()(Forum)
