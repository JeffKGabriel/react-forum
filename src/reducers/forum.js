import * as authHelper from '../firebase.config.js'
import {ref, firebaseAuth} from '../firebase.config.js'

const initialState = {
  qwe : 'qwe'
}

const TEST = "TEST"

export function test(word){
  return{
    type : TEST,
    word
  }
}

export default function forum(state = initialState, action) {

  switch (action.type) {

    case TEST :
      return {
        ...state,
        qwe : action.word,
      }

    default :
      return state
  }

}
