import React, { Component } from 'react'
import { connect } from 'react-redux'

import {addNewSection} from '../reducers/forum'

class AddNewSection extends Component{

  constructor(props){
    super(props)
    this.state={
      sectionName: '',
      sectionDescription: ''
    }
  }

  handleKeyPress=(e)=>{
    if (e.key === 'Enter') {
      this.submitNewSection()
    }
  }

  handleSectionName=(e)=>{
    this.setState({sectionName: e.target.value});
  }

  handleSectionDescription=(e)=>{
    this.setState({sectionDescription: e.target.value});
  }

  submitNewSection=()=>{
    this.props.dispatch(addNewSection(
      {
        name: this.state.sectionName,
        description: this.state.sectionDescription
      }
    ))
    this.setState({
      sectionName:'',
      sectionDescription:''
    })
  }

  render(){
    return(
      <div className='AddNewSection-Box'>
        <div className='AddNewSection'>
          AddNewSection
          <input
            className="form-control"
            placeholder="Section Name"
            onChange={this.handleSectionName}
            value={this.state.sectionName}
            onKeyPress={this.handleKeyPress} />
          <input
            className="form-control"
            placeholder="Description"
            onChange={this.handleSectionDescription}
            value={this.state.sectionDescription}
            onKeyPress={this.handleKeyPress} />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.submitNewSection}
            >
             Add New Section
          </button>
        </div>
      </div>
    )
  }

}

export default connect()(AddNewSection)
