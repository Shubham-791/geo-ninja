import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';
// import 'firebase/analytics';

var firebaseConfig = {
  apiKey: "AIzaSyCKORHgcNpPdd-zYdYAYK5tmFdPOehI11A",
  authDomain: "geo-ninja-2.firebaseapp.com",
  databaseURL: "https://geo-ninja-2.firebaseio.com",
  projectId: "geo-ninja-2",
  storageBucket: "geo-ninja-2.appspot.com",
  messagingSenderId: "1004699270035",
  appId: "1:1004699270035:web:31724d9761c880bce48666"
};
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export default firebaseApp.firestore(); 