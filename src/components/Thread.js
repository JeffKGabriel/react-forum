import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddNewPost from './AddNewPost'
import Post from './Post'

class Thread extends Component{

  constructor (props) {
    super(props)
  }

  render(){

    console.log('thread props',this.props);

    let threadData = this.props.threads[this.props.threadID]

    let threadName = threadData ? threadData.name : ''

    console.log('threadData',threadData);

    let postsArr = Object.keys(this.props.posts).map(i =>{
      return{
      ...this.props.posts[i],
      id : i
      }
    })

    let postData = postsArr.filter(a=>a.thread == this.props.threadID)
    console.log('postData',postData);

    let displayPosts = postData.map((a,k)=>{
      return <Post key={k} {...this.props} {...a} />
    })

    return(
      <div className='Thread-Box'>
        <div className='Thread-Title'>{threadName}</div>
        {displayPosts}
        <AddNewPost {...this.props} />
      </div>
    )
  }

}

const mapStateToProps = ({forum}) => {
  return {
    threads: forum.threads
  }
}

export default connect(mapStateToProps)(Thread)
