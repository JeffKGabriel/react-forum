import React, { Component } from 'react'
import { connect } from 'react-redux'

import Identicon from 'identicon.js'

class Post extends Component{

  constructor (props) {
    super(props)
    this.state={
      showDetails: false
    }
  }

  toggleShowDetails=()=>{
    console.log('showing details');
    this.setState({showDetails: !this.state.showDetails})
  }

  render(){
    console.log('post props',this.props);
    let postUserID = this.props.userID
    console.log('postUserID',postUserID)

    var options = {
      background: [255, 255, 255, 255],
      margin: 0.2,
      size: 128,
    };
    let identiconData = new Identicon(postUserID, options).toString()
    let identiconImg = <img width='38' height='38' src={`data:image/png;base64,${identiconData}`} />

    let postDate = new Date(this.props.date)
    let showPostDate = postDate.toLocaleDateString('en-US',{month:'numeric',day:'numeric',year:"2-digit"})
    let showPostTime = postDate.toLocaleTimeString('en-US',{hour:'numeric',minute:'numeric',hour12:false})
    return(
      <div className='Post-Box' onClick={()=>{this.toggleShowDetails}}>
        <div className='Post-Main'>
          <div className='Post-Content'>
            {this.props.content}
          </div>
          {
            this.state.showDetails &&
            <div className='Post-Details'>
              {identiconImg}
              <div>{showPostTime}</div>
              <div>{showPostDate}</div>
            </div>
          }
        </div>
        <div className='Post-BottomBorder'/>
      </div>
    )
  }

}

export default connect()(Post)
