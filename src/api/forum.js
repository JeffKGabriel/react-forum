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
