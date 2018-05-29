import React, { Component } from 'react'
import { connect } from 'react-redux'

import {loginUser} from '../reducers/forum'


class Login extends Component{

  constructor (props) {
    super(props)
    this.state={
      email:'',
      password : ''
    }
  }

  handleEmail=(e)=>{
    this.setState({email: e.target.value});
  }

  handlePassword=(e)=>{
    this.setState({password: e.target.value});
  }

  submitLogin=()=>{
    this.props.dispatch(loginUser(this.state.email,this.state.password))
  }

  render(){
    return(
      <div className='ReactForum-LoginBox'>
        {this.props.userID == '' && this.props.members && this.props.members.length != 0 &&  (
          <div>
            <input
              className="form-control"
              type="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={this.handleEmail} />
            <input
              className="form-control"
              type='password'
              placeholder="Password"
              onChange={this.handlePassword} />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.submitLogin}
              >
               Login
            </button>
          </div>
        )}
      </div>
    )
  }

}

const mapStateToProps = ({forum}) => {
  return {
    userID : forum.userID,
    members: forum.members,
  }
}

export default connect(mapStateToProps)(Login)
