import React, { Component } from 'react'
import { connect } from 'react-redux'

import {createAccount,createAdmin} from '../../reducers/forum'

//import {buttons} from 'bootstrap-css'

class CreateAdmin extends Component{

  constructor (props) {
    super(props)
    this.state={
      email:'',
      username : '',
      password : ''
    }
  }

  submitUsername=()=>{
    console.log('submit username',this.state.username);
    this.props.dispatch(createAdmin(this.props.uid, {name:this.state.username, uid:this.props.uid}))
  }

  createStandaloneAdminAccount=()=>{
    this.props.dispatch(createAccount('admin',this.state.email,this.state.username,this.state.password))
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
      <div className='CreateAdmin-Box'>
        {this.props.standalone &&
          <div className='CreateAdmin-firstTimeSetupBox'>
            <div className='CreateAdmin-firstTimeSetupText'>First Time Setup</div>
              <input
                className="form-control"
                id="adminUsername"
                type="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={this.handleEmail} />
              <input
                className="form-control"
                id="adminUsername"
                placeholder="Admin Username"
                onChange={this.handleUsername} />
              <input
                className="form-control"
                type='password'
                id="adminPassword"
                placeholder="Password"
                onChange={this.handlePassword} />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.createStandaloneAdminAccount}
                >
                 Setup
              </button>
          </div>
        }
        {!this.props.standalone &&
           <div className='CreateAdmin-firstTimeSetupBox'>
             <div className='CreateAdmin-firstTimeSetupText'>First Time Setup for {this.props.email}</div>
             <input
               className="form-control"
               id="adminUsername"
               placeholder="Admin Username"
               onChange={this.handleUsername} />
             <input
               className="form-control"
               type='password'
               id="adminPassword"
               placeholder="Password"
               onChange={this.handlePassword} />
             <button
               type="submit"
               className="btn btn-primary"
               onClick={this.submitUsername}
               >
                Setup
             </button>
           </div>
        }
      </div>
    )
  }

}

export default connect()(CreateAdmin)
