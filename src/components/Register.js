import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateUser from './Register/CreateUser'

class Register extends Component{

  render(){
    return(
      <div className='ReactForum-RegisterBox'>
        { this.props.members && this.props.members.length == 0 &&
          <CreateUser {...this.props} type='admin' />
        }
        { this.props.members && this.props.userID == '' && this.props.members.length != 0 &&
          <CreateUser {...this.props} type='user' />
        }
      </div>
    )
  }

}

const mapStateToProps = ({forum}) => {
  return {
    members: forum.members,
    userEmail : forum.userEmail,
    userID : forum.userID
  }
}

export default connect(mapStateToProps)(Register)
