import React, { Component } from 'react'
import { connect } from 'react-redux'

import {updateActiveSection} from '../reducers/forum'

class Section extends Component{

  constructor (props) {
    super(props)
  }

  openSection=(id)=>{
    console.log('openSection',id,this.props.path);
    //this.props.dispatch(updateActiveSection(id))
    this.props.history.push(`${this.props.path}/${id}`)
  }

  render(){
    return(
      <div className='Section-Box' onClick={()=>{this.openSection(this.props.id)}}>
        {this.props.name}
      </div>
    )
  }

}

export default connect()(Section)
