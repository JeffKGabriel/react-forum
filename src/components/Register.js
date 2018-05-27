import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateAdmin from './Register/CreateAdmin'

class Register extends Component{

  constructor (props) {
    super(props)
  }

  render(){
    return(
      <div className='Register-Box'>
        register
        { this.props.members && this.props.members.length == 0 &&
          <CreateAdmin {...this.props} />
        }
      </div>
    )
  }

}

const mapStateToProps = ({forum}) => {
  return {
    members: forum.members,
    userEmail : forum.userEmail,
  }
}

export default connect(mapStateToProps)(Register)
