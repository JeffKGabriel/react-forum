import React, { Component } from 'react'
import { connect } from 'react-redux'

class ThreadItem extends Component{

  constructor (props) {
    super(props)
  }

  openThread=(id)=>{
    console.log('openThread',id);
    this.props.history.push(`${this.props.section}/${id}`)
  }

  render(){
    let showDate = new Date(this.props.date)
    showDate = showDate.toLocaleDateString("en-US")
    return(
      <div className='ThreadItem-Box' onClick={()=>{this.openThread(this.props.id)}}>
        <div>{this.props.name}</div>
        <div>{showDate}</div>
      </div>
    )
  }

}

export default connect()(ThreadItem)
