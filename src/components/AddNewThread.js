import React, { Component } from 'react'
import { connect } from 'react-redux'

import {addNewThread} from '../reducers/forum'

class AddNewThread extends Component{

  constructor (props) {
    super(props)
    this.state={
      threadName: ''
    }
  }

  handleThreadName=(e)=>{
    this.setState({threadName: e.target.value});
  }

  submitNewThread=()=>{
    this.props.dispatch(addNewThread(
      {
        name: this.state.threadName,
        userID: this.props.userID,
        section: this.props.sectionID,
        date: Date.now()
      }
    ))
    this.props.closeAddNewThread()
  }

  render(){
    return(
      <div className='AddNewThread-Box'>
        AddNewThread
        <input
          className="form-control"
          placeholder="Thread Name"
          onChange={this.handleThreadName} />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.submitNewThread}
          >
           Add New Thread
        </button>
      </div>
    )
  }

}

export default connect()(AddNewThread)
