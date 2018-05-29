import React, { Component } from 'react'
import { connect } from 'react-redux'

import {addNewPost} from '../reducers/forum'

class AddNewPost extends Component{

  constructor (props) {
    super(props)
    this.state={
      content : ''
    }
  }

  handlePostContent=(e)=>{
    this.setState({content: e.target.value});
  }

  submitNewPost=()=>{
    this.props.dispatch(addNewPost(
      {
        content: this.state.content,
        userID: this.props.userID,
        section: this.props.sectionID,
        thread: this.props.threadID,
        date: Date.now()
      }
    ))
  }

  render(){
    return(
      <div className='NewPost-Box'>
        Add New Post
        <textarea
          className="form-control"
          placeholder="Post Content"
          onChange={this.handlePostContent} />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.submitNewPost}
          >
           Post
        </button>
      </div>
    )
  }

}

export default connect()(AddNewPost)
