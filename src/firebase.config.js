import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyB-4O6Sf72lL69TafWa72Dzu2ezoNTDTdo",
    authDomain: "jgabme-cb570.firebaseapp.com",
    databaseURL: "https://jgabme-cb570.firebaseio.com",
    projectId: "jgabme-cb570",
    storageBucket: "jgabme-cb570.appspot.com",
    messagingSenderId: "525043928973"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const fbdb = firebase.database()
export const firebaseAuth = firebase.auth
