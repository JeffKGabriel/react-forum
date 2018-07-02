import React, { Component } from 'react'
import { connect } from 'react-redux'

class Breadcrumbs extends Component{

  constructor (props) {
    super(props)
  }

  goToBreadcrumb=(arr,id,k)=>{
    console.log('goToBreadcrumb',arr,id,k);
    if(id == 0){
      this.props.history.push(`${this.props.path}`)
    }
    if(k == 1){
      this.props.history.push(`${this.props.path}/${id}`)
    }
    if(k == 2){
      this.props.history.push(`${this.props.path}/${arr[1].id}/${id}`)
    }
  }

  render(){
    //console.log('Breadcrumbs props',this.props);
    let breadcrumbArr = this.props.forumPath.map((a,k)=>{
        //console.log('this is breadcrumb ',a);
        if(k==0){
          return {
            id : 0,
            name : '#'
          }
        }if(k==1 && Object.keys(this.props.sections).length > 0){
          return {
            id: a,
            name : this.props.sections[a].name
          }
        }if(k==2 && Object.keys(this.props.threads).length > 0){
          return {
            id: a,
            name : this.props.threads[a].name
          }
        }
      })
    //console.log('breadcrumbArr',breadcrumbArr);
    let showBreadcrumbs = breadcrumbArr.map((a,k)=>{
      if(a){
        return (
          <div className='BreadcrumbSection' key={k}>
            {a.id != 0 &&
              <div> > </div>
            }
            <div
              className='breadcrumbLink'
              onClick={()=>this.goToBreadcrumb(breadcrumbArr,a.id,k)}>
              {a.name}
            </div>
          </div>
        )
      }
    })
    return(
      <div className='Breadcrumbs-Box'>
        {showBreadcrumbs}
      </div>
    )
  }

}

export default connect()(Breadcrumbs)
