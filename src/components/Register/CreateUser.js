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
      type : props.type,
      error : ''
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
      .then(res=>{

      })
      .catch(err=>{
        this.setState({error:err.message})
      })
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

  handleEnter=(e)=>{
    if (e.key === 'Enter') {
      this.submitLogin()
    }
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
                onKeyPress={this.handleEnter}
                onChange={this.handlePassword} />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.createNewAccount}
                >
                 {this.props.type == 'admin' ?
                   <div>Setup</div>
                   :
                   <div>Register</div>
                 }
              </button>
              {this.state.error}
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
               onKeyPress={this.handleEnter}
               onChange={this.handlePassword} />
             <button
               type="submit"
               className="btn btn-primary"
               onClick={this.createNewAccount}
               >
                 {this.props.type == 'admin' ?
                   <div>Setup</div>
                   :
                   <div>Register</div>
                 }
             </button>
             {this.state.error}
           </div>
        }
      </div>
    )
  }

}

export default connect()(CreateUser)
