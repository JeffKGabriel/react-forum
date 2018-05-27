import * as authHelper from '../firebase.config.js'
import {ref, fbdb, firebaseAuth, forumConfig} from '../firebase.config.js'

import {addUserAPI,getUserAPI} from '../api/forum'

const initialState = {
  members : null,
  sections : [],
  threads : [],
  userEmail : null,
  userID: null,
  userType: '',
  userName: null
}

const UPDATE_FORUM_MEMBERS = "UPDATE_FORUM_MEMBERS"
const UPDATE_FORUM_SECTIONS = "UPDATE_FORUM_SECTIONS"
const UPDATE_FORUM_THREADS = "UPDATE_FORUM_THREADS"
const UPDATE_USER = "UPDATE_USER"


export function updateForumMembers(members){
  return{
    type : UPDATE_FORUM_MEMBERS,
    members
  }
}
export function updateForumSections(sections){
  return{
    type : UPDATE_FORUM_SECTIONS,
    sections
  }
}
export function updateForumThreads(threads){
  return{
    type : UPDATE_FORUM_THREADS,
    threads
  }
}

export function createUser(type,username,uid){
  return (dispatch, getState) => {
    return addUserAPI(forumConfig.name,uid,{username,uid,type})
  }
}

export function getUser(){
  return (dispatch, getState) => {
    firebaseAuth().onAuthStateChanged(user=>{
      if(user){
        getUserAPI(forumConfig.name,user.uid)
          .then(userData=>{
            console.log('userData',userData);
            dispatch({
              type:UPDATE_USER,
              email:user.email,
              uid:user.uid,
              userType:userData.type,
              username:userData.username
            })
          })
      }else{
        console.log('no user');
      }
    })
  }
}

export function createAccount(type,email,username,password){
  return (dispatch, getState) => {
    firebaseAuth().createUserWithEmailAndPassword(email,password)
      .then(res=>{
        console.log('createUserWithEmailAndPassword res',res);
        dispatch(createUser(type,username,res.uid))
          .then(res2=>{
            console.log('createUser',res2);
            dispatch(getForumData())
          })
      })
  }
}

/*
export function createAdmin(uid,userData){
  return (dispatch, getState) => {
    console.log('forumConfig',forumConfig.name,uid);
    addAdmin(forumConfig.name,uid,userData)
      .then(res=>{
        console.log('addAdmin res',res,res.val());
      })
  }
}
*/

export function getForumData(){
  return (dispatch, getState) => {
    let app = 'ytradio'
    fbdb.ref('forum/'+app).once('value')
      .then(snap=>{
        let forumData = snap.val()
        console.log('forumData',forumData);
        if(!forumData){
          console.log('we have no forum in the DB forum/'+app)
          dispatch(updateForumMembers([]))
        }else{
          dispatch(updateForumMembers(forumData.users))
        }
        // dispatch(updateForumMembers(forumData.members))
        // dispatch(updateForumSections(forumData.sections))
        // dispatch(updateForumThreads(forumData.threads))
      })
      .catch(err=>{
        console.log('error connecting to DB',err)
      })
  }
}

export default function forum(state = initialState, action) {

  switch (action.type) {

    case UPDATE_FORUM_MEMBERS:
      return{
        ...state,
        members: action.members
      }
    case UPDATE_FORUM_SECTIONS:
      return{
        ...state,
        sections: action.sections
      }
    case UPDATE_FORUM_THREADS:
      return{
        ...state,
        threads: action.threads
      }
    case UPDATE_USER:
      return{
        ...state,
        userEmail : action.email,
        userID: action.uid,
        userType: action.userType,
        userName: action.username
      }

    default :
      return state
  }

}
