import * as authHelper from '../firebase.config.js'
import {ref, fbdb, firebaseAuth, forumConfig} from '../firebase.config.js'

import {addUserAPI,getUserAPI,addNewSectionAPI,addNewThreadAPI,addNewPostAPI,removeSectionAPI} from '../api/forum'

const initialState = {
  members : null,
  sections : {},
  threads : {},
  posts : {},
  userEmail : null,
  userID: null,
  userType: '',
  userName: null,
  activeSection: ''
}

const UPDATE_FORUM_MEMBERS = "UPDATE_FORUM_MEMBERS"
const UPDATE_FORUM_SECTIONS = "UPDATE_FORUM_SECTIONS"
const UPDATE_FORUM_THREADS = "UPDATE_FORUM_THREADS"
const UPDATE_USER = "UPDATE_USER"
//const UPDATE_ACTIVE_SECTION = "UPDATE_ACTIVE_SECTION"
const UPDATE_FORUM_POSTS = "UPDATE_FORUM_POSTS"


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
export function updateForumPosts(posts){
  return{
    type : UPDATE_FORUM_POSTS,
    posts
  }
}

/*
export function updateActiveSection(section){
  return{
    type : UPDATE_ACTIVE_SECTION,
    section
  }
}
*/

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
        dispatch({
          type:UPDATE_USER,
          email: '',
          uid: '',
          userType: '',
          username: ''
        })
      }
    })
  }
}

export function createAccount(type,email,username,password){
  return (dispatch, getState) => {
    return firebaseAuth().createUserWithEmailAndPassword(email,password)
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

export function loginUser(email,password){
  return (dispatch, getState) => {
    return firebaseAuth().signInWithEmailAndPassword(email,password)
      .then(res=>{
        console.log('signInWithEmailAndPassword res',res)
        dispatch({
          type:UPDATE_USER,
          email: '',
          uid: '',
          userType: '',
          username: ''
        })
      })

  }
}

export function logoutUser(email,password){
  return (dispatch, getState) => {
    firebaseAuth().signOut()
      .then(res=>{
        console.log('firebaseAuth().signOut res',res)
      })

  }
}

export function addNewSection(sectionData){
  return (dispatch, getState) => {
    addNewSectionAPI(forumConfig.name,sectionData)
      .then(res=>{
        console.log('addNewSectionAPI res',res);
      })
  }
}

export function removeSection(sectionId){
  return (dispatch, getState) => {
    removeSectionAPI(forumConfig.name,sectionId)
      .then(res=>{
        console.log('removeSectionAPI res',res);
      })
  }
}



export function addNewThread(threadData){
  return (dispatch, getState) => {
    console.log('addNewThread',threadData);
    addNewThreadAPI(forumConfig.name,threadData)
      .then(res=>{
        console.log('addNewThreadAPI res',res);
      })
  }
}

export function addNewPost(postData){
  return (dispatch, getState) => {
    addNewPostAPI(forumConfig.name,postData)
      .then(res=>{
        console.log('addNewPostAPI res',res);
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
    fbdb.ref('forum/'+app).on('value', snap=>{ //.once()
        let forumData = snap.val()
        console.log('forumData',forumData);
        if(!forumData){
          console.log('we have no forum in the DB forum/'+app)
          dispatch(updateForumMembers([]))
        }else{
          if(forumData.users){
            dispatch(updateForumMembers(forumData.users))
          }
          if(forumData.threads){
            dispatch(updateForumThreads(forumData.threads))
          }
          if(forumData.posts){
            dispatch(updateForumPosts(forumData.posts))
          }
          if(forumData.sections){
            dispatch(updateForumSections(forumData.sections))
          }else{
            // first time - just make general section
            dispatch(updateForumSections(
              'qwe':
                {
                  name : 'general'
                }
            ))
          }
        }
        // dispatch(updateForumMembers(forumData.members))
        // dispatch(updateForumSections(forumData.sections))
        // dispatch(updateForumThreads(forumData.threads))
      })
      /*
      .catch(err=>{
        console.log('error connecting to DB',err)
      })
      */
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
    case UPDATE_FORUM_POSTS:
      return{
        ...state,
        posts: action.posts
      }
    case UPDATE_USER:
      return{
        ...state,
        userEmail : action.email,
        userID: action.uid,
        userType: action.userType,
        userName: action.username
      }
    /*
    case UPDATE_ACTIVE_SECTION:
      return{
        ...state,
        activeSection : action.section
      }
    */

    default :
      return state
  }

}
