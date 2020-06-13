import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyB09QodFRCAn5nY2b7lUmAKnCgrPQ5iyNY',
  authDomain: 'auzooa-7d140.firebaseapp.com',
  databaseURL: 'https://auzooa-7d140.firebaseio.com',
  projectId: 'auzooa-7d140',
  storageBucket: 'auzooa-7d140.appspot.com',
  messagingSenderId: '1076231782472',
  appId: '1:1076231782472:web:8a4789bb3a28616e19987d',
  measurementId: 'G-N6LLXS0SLV'
}

export const app = firebase.initializeApp(config)
