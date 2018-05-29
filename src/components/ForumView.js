import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddNewThread from './AddNewThread'
import ThreadItem from './ThreadItem'

class ForumView extends Component{

  constructor (props) {
    super(props)
  }

  render(){

    let sectionData = this.props.sections[this.props.sectionID]

    const ThreadsArr = Object.keys(this.props.threads).map(i =>{
      return{
      ...this.props.threads[i],
      id : i
      }
    })

    let displayThreads = ThreadsArr.map((a,k)=>{
      return <ThreadItem key={k} {...a} {...this.props} />
    })

    return(
      <div className='ForumView-Box'>
        ForumView - {this.props.id}
        <AddNewThread userID={this.props.userID} section={this.props.sectionID}/>
        {displayThreads}
      </div>
    )
  }

}

const mapStateToProps = ({forum}) => {
  return {
    members: forum.members,
    threads: forum.threads,
    sections : forum.sections,
    userEmail : forum.userEmail,
    userID : forum.userID,
    userType : forum.userType,
    userName : forum.userName,
    activeSection: forum.activeSection
  }
}

export default connect(mapStateToProps)(ForumView)
