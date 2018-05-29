import React, { Component } from 'react'
import { connect } from 'react-redux'

import {addNewSection} from '../reducers/forum'

class AddNewSection extends Component{

  constructor(props){
    super(props)
    this.state={
      sectionName: ''
    }
  }

  handleSectionName=(e)=>{
    this.setState({sectionName: e.target.value});
  }

  submitNewSection=()=>{
    this.props.dispatch(addNewSection(
      {
        name: this.state.sectionName
      }
    ))
  }

  render(){
    return(
      <div className='AddNewSection-Box'>
        AddNewSection
        <input
          className="form-control"
          placeholder="Section Name"
          onChange={this.handleSectionName} />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.submitNewSection}
          >
           Add New Section
        </button>
      </div>
    )
  }

}

export default connect()(AddNewSection)
