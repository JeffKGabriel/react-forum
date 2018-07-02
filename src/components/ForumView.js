import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddNewThread from './AddNewThread'
import ThreadItem from './ThreadItem'

class ForumView extends Component{

  constructor (props) {
    super(props)
    this.state={
      showAddNewThread: false
    }
  }

  showAddNewThread=()=>{
    this.setState({showAddNewThread: !this.state.showAddNewThread})
  }

  closeAddNewThread=()=>{
    this.setState({showAddNewThread: false})
  }

  render(){

    //console.log('forumview props',this.props);

    let sectionData = this.props.sections[this.props.sectionID]
    let forumName = sectionData ? sectionData.name : ''

    console.log('sectionData',sectionData);

    let sectionThreads = Object.keys(this.props.threads).map(a=>{
      return{
        ...this.props.threads[a],
        id:a
      }
    })

    sectionThreads = sectionThreads.filter(a=>a.section == this.props.sectionID)

    sectionThreads = sectionThreads.sort((a,b)=>{
      console.log('a',a,'b',b)
      if(a.date > b.date){
        return -1
      }else if(b.date > a.date){
        return 1
      }else{
        return 0
      }
    })

    let displayThreads = sectionThreads.map((a,k)=>{
      return <ThreadItem key={k} {...a} history={this.props.history} />
    })

    return(
      <div className='ForumView-Box'>
        <div className='ForumView-Title'>{forumName}</div>
        {forumName != '' &&
          <button
            type="submit"
            className="ForumView-NewThreadButton"
            onClick={this.showAddNewThread}
            >
             +
          </button>
        }
        {this.state.showAddNewThread &&
          <AddNewThread
            userID={this.props.userID}
            sectionID={this.props.sectionID}
            closeAddNewThread={this.closeAddNewThread}/>
        }
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
