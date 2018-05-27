import React, { Component } from 'react'
import { connect } from 'react-redux'

class ForumLayer extends Component{

  constructor (props) {
    super(props)
  }

  render(){
    return(
      <div className='ForumLayer-Box'>
        {this.props.name}
      </div>
    )
  }

}

export default connect()(ForumLayer)
