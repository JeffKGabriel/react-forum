import React, { Component } from 'react'
import { connect } from 'react-redux'

class Post extends Component{

  constructor (props) {
    super(props)
  }

  render(){
    return(
      <div className='Post-Box'>
        Post - {this.props.content}
      </div>
    )
  }

}

export default connect()(Post)
