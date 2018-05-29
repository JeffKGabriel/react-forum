import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddNewPost from './AddNewPost'
import Post from './Post'

class Thread extends Component{

  constructor (props) {
    super(props)
  }

  render(){

    let postsArr = Object.keys(this.props.posts).map(i =>{
      return{
      ...this.props.posts[i],
      id : i
      }
    })

    let postData = postsArr.filter(a=>a.thread == this.props.threadID)
    console.log('postData',postData);

    let displayPosts = postData.map((a,k)=>{
      return <Post key={k} {...a} {...this.props} />
    })

    return(
      <div className='Thread-Box'>
        Thread - {this.props.threadID}
        {displayPosts}
        <AddNewPost {...this.props} />
      </div>
    )
  }

}

export default connect()(Thread)
