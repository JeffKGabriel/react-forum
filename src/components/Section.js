import React, { Component } from 'react'
import { connect } from 'react-redux'

import {updateActiveSection,removeSection} from '../reducers/forum'

class Section extends Component{

  constructor (props) {
    super(props)
  }

  openSection=(id)=>{
    console.log('openSection',id,this.props.path);
    //this.props.dispatch(updateActiveSection(id))
    this.props.history.push(`${this.props.path}/${id}`)
  }

  removeSection=(e,id)=>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    console.log('remove section',id);
    this.props.dispatch(removeSection(id))
  }

  render(){
    return(
      <div className='Section-Box' onClick={()=>{this.openSection(this.props.id)}}>
        <div className='Section-Top'>
          <div className='Section-Title'>{this.props.name}</div>
          {this.props.userType == 'admin' &&
            <div className='Section-CloseButton' onClick={(e)=>{this.removeSection(e,this.props.id)}}>
              <i className='fas fa-times'/>
            </div>
          }
        </div>
        <div className='Section-Description'>
          {this.props.description}
        </div>
      </div>
    )
  }

}

export default connect()(Section)
