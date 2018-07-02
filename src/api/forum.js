import {ref, fbdb, firebaseAuth} from '../firebase.config.js'

export function addUserAPI(app,uid,userData){
  return ref.child(`forum/${app}/users/${uid}`)
    .set(userData)
}

export function getUserAPI(app,uid){
  return ref.child(`forum/${app}/users/${uid}`)
    .once('value')
    .then((snapshot) => snapshot.val())
}

export function addNewSectionAPI(app,sectionData){
  return ref.child(`forum/${app}/sections`)
    .push(sectionData)
}

export function removeSectionAPI(app,sectionId){
  return ref.child(`forum/${app}/sections/${sectionId}`)
    .remove()
}

export function addNewThreadAPI(app,threadData){
  return ref.child(`forum/${app}/threads`)
    .push(threadData)
}

export function addNewPostAPI(app,postData){
  return ref.child(`forum/${app}/posts`)
    .push(postData)
}
