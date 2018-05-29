import React, { Component } from 'react'
import { connect } from 'react-redux'

import {createAccount,createAdmin} from '../../reducers/forum'

//import {buttons} from 'bootstrap-css'

class CreateUser extends Component{

  constructor (props) {
    super(props)
    this.state={
      email:'',
      username : '',
      password : '',
      type : props.type
    }
    if(!props.standalone){
      this.state.email = props.email
    }
  }

  createNewAccount=()=>{
    this.props.dispatch(
      createAccount(
        this.state.type,
        this.state.email,
        this.state.username,
        this.state.password
      )
    )
  }

  handleUsername=(e)=>{
    this.setState({username: e.target.value});
  }

  handleEmail=(e)=>{
    this.setState({email: e.target.value});
  }

  handlePassword=(e)=>{
    this.setState({password: e.target.value});
  }

  render(){
    return(
      <div className='CreateUser-Box'>
        <input type='hidden' value='prayer' />
        {this.props.standalone &&
          <div className='CreateUser-firstTimeSetupBox'>
            <div className='CreateUser-firstTimeSetupText'>Register</div>
              <input
                className="form-control"
                type="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={this.handleEmail} />
              <input
                className="form-control"
                placeholder="Username"
                onChange={this.handleUsername} />
              <input
                className="form-control"
                type='password'
                placeholder="Password"
                onChange={this.handlePassword} />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.createNewAccount}
                >
                 Setup
              </button>
          </div>
        }
        {!this.props.standalone &&
           <div className='CreateUser-firstTimeSetupBox'>
             <div className='CreateUser-firstTimeSetupText'>First Time Setup for {this.props.email}</div>
             <input
               className="form-control"
               placeholder="Username"
               onChange={this.handleUsername} />
             <input
               className="form-control"
               type='password'
               placeholder="Password"
               onChange={this.handlePassword} />
             <button
               type="submit"
               className="btn btn-primary"
               onClick={this.createNewAccount}
               >
                Setup
             </button>
           </div>
        }
      </div>
    )
  }

}

export default connect()(CreateUser)
