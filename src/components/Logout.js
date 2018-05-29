import React, { Component } from 'react'
import { connect } from 'react-redux'

import {logoutUser} from '../reducers/forum'

class Logout extends Component{

  submitLogout=()=>{
    this.props.dispatch(logoutUser())
  }

  render(){
    return(
      <div className='Logout-Box'>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.submitLogout}
          >
           Logout
        </button>
      </div>
    )
  }

}

export default connect()(Logout)
