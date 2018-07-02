import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import {getForumData} from '../reducers/forum'
import Section from './Section'
import Header from './Header'

import AddNewSection from './AddNewSection'
import ForumView from './ForumView'
import Thread from './Thread'


import {getUser} from '../reducers/forum'

require('../styles/index.css');

class Forum extends Component{

  constructor (props) {
    super(props)
  }

  componentWillMount(){
    this.props.dispatch(getForumData())
    this.props.dispatch(getUser())

    const script = document.createElement("script");

    script.src = "https://use.fontawesome.com/releases/v5.0.13/js/all.js";
    script.async = true;

    document.body.appendChild(script);

  }

  componentDidMount(){
  }

  render(){
    //console.log('forum this.props',this.props);

    let forumPath = this.props.location.pathname.replace(this.props.path,'').split("/")
    //console.log('forumPath',forumPath);

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
        <Header {...this.props} forumPath={forumPath} />

        {!forumPath[1] &&
          <div className='Section-Boxes'>
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
    threads : forum.threads,
    userEmail : forum.userEmail,
    userID : forum.userID,
    userType : forum.userType,
    userName : forum.userName
  }
}

export default withRouter(connect(mapStateToProps)(Forum))
