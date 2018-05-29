import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import {getForumData} from '../reducers/forum'
import Section from './Section'
import Register from './Register'
import Login from './Login'
import Logout from './Logout'
import AddNewSection from './AddNewSection'
import ForumView from './ForumView'
import Thread from './Thread'


import {getUser} from '../reducers/forum'

require('../styles/index.css');

class Forum extends Component{

  constructor (props) {
    super(props)
    this.state={
      value : -1
    }
  }

  componentWillMount(){
    this.props.dispatch(getForumData())
    this.props.dispatch(getUser())
  }

  componentDidMount(){
  }

  render(){
    console.log('forum this.props',this.props);

    let forumPath = this.props.location.pathname.replace(this.props.path,'').split("/")
    console.log('forumPath',forumPath);

    const sectionsArr = Object.keys(this.props.sections).map(i =>{
      return{
      ...this.props.sections[i],
      id : i
      }
    })

    let topLevelForums = sectionsArr.map((a,k)=>{
      return <Section key={k} {...a} {...this.props} />
    })

    return(
      <div className='Forum-Box'>
        forum - {this.props.userName} - {this.props.userType}
        <Register {...this.props} />
        <Login />
        <Logout />

        {!forumPath[1] &&
          <div>
            {topLevelForums}
            {this.props.userType == 'admin' &&
              <AddNewSection />
            }
          </div>
        }

        {forumPath[1] && !forumPath[2] &&
          <ForumView sectionID={forumPath[1]} history={this.props.history} forumPath={forumPath} />
        }

        {forumPath[2] &&
          <Thread sectionID={forumPath[1]} threadID={forumPath[2]} userID={this.props.userID} posts={this.props.posts} />
        }

      </div>
    )
  }

}

const mapStateToProps = ({forum}) => {
  return {
    posts: forum.posts,
    members: forum.members,
    sections : forum.sections,
    userEmail : forum.userEmail,
    userID : forum.userID,
    userType : forum.userType,
    userName : forum.userName
  }
}

export default withRouter(connect(mapStateToProps)(Forum))
