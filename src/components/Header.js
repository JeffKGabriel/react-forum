import React, { Component } from 'react'
import { connect } from 'react-redux'

import Register from './Register'
import Login from './Login'
import Logout from './Logout'
import Breadcrumbs from './Breadcrumbs'

class Header extends Component{

  constructor (props) {
    super(props)
    this.state={
      showRegister:false,
      showLogin:false
    }
  }

  showRegister=()=>{
    this.setState({showRegister : true, showLogin: false})
  }

  showLogin=()=>{
    this.setState({showLogin : true, showRegister:false})
  }

  render(){
    let isUser = this.props.userID && this.props.userID.length > 0
    let showRegisterBox = !this.state.showRegister && !isUser
    let showLoginBox = !this.state.showLogin && !isUser
    return(
      <div className='Header-Box'>
        <div className='HeaderRow'>
          {`: ${this.props.userName}`}

          {this.state.showRegister &&
            <Register {...this.props} />
          }
          {this.state.showLogin &&
            <Login />
          }

          <div>
            {showRegisterBox &&
              <button
                type="submit"
                className="btn Header-Button"
                onClick={this.showRegister}
                >
                 Register
              </button>
            }
            {showLoginBox &&
              <button
                type="submit"
                className="btn Header-Button"
                onClick={this.showLogin}
                >
                 Login
              </button>
            }
            {
              isUser &&
              <Logout />
            }

          </div>


        </div>
        <Breadcrumbs {...this.props} />
      </div>
    )
  }

}

export default connect()(Header)
