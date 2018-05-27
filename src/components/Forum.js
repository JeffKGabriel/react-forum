import React, { Component } from 'react'
import { connect } from 'react-redux'

import {getForumData} from '../reducers/forum'
import ForumLayer from './ForumLayer'
import Register from './Register'

import {getUser} from '../reducers/forum'

require('../styles/index.css');

class Forum extends Component{

  constructor (props) {
    super(props)
  }

  componentWillMount(){
    this.props.dispatch(getForumData())
    this.props.dispatch(getUser())
  }

  componentDidMount(){
  }

  render(){
    console.log('forum this.props',this.props);
    let topLevelForums = this.props.sections.map((a,k)=>{
      return <ForumLayer key={k} name={a} />
    })
    return(
      <div className='Forum-Box'>
        forum - {this.props.email} - {this.props.userName} - {this.props.userType}
        <Register {...this.props} />
        {topLevelForums}
      </div>
    )
  }

}

const mapStateToProps = ({forum}) => {
  return {
    members: forum.members,
    sections : forum.sections,
    userEmail : forum.userEmail,
    userID : forum.userID,
    userType : forum.userType,
    userName : forum.userName
  }
}

export default connect(mapStateToProps)(Forum)
