import firebase from 'firebase/app'
import 'firebase/storage'
import { FIREBASE_CONFIG } from '../key'

const config = FIREBASE_CONFIG;

  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }