import React, { Component } from 'react'
import { connect } from 'react-redux'

class ThreadItem extends Component{

  constructor (props) {
    super(props)
  }

  openThread=(id)=>{
    console.log('openThread',id);
    this.props.history.push(`${this.props.sectionID}/${id}`)
  }

  render(){
    console.log('thread item props',this.props);
    return(
      <div className='ThreadItem-Box' onClick={()=>{this.openThread(this.props.id)}}>
        ThreadItem - {this.props.name}
      </div>
    )
  }

}

export default connect()(ThreadItem)
