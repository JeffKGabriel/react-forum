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
      <div className='Login-Box'>
        Login
        <input
          className="form-control"
          id="adminUsername"
          type="email"
          aria-describedby="emailHelp"
          placeholder="Email"
          onChange={this.handleEmail} />
        <input
          className="form-control"
          type='password'
          id="adminPassword"
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
    )
  }

}

export default connect()(Login)
