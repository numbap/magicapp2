import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA6u0lsfoQTszYBV5ClVV5pGCimKcvxaG4",
  authDomain: "magicapp-28c55.firebaseapp.com",
  databaseURL: "https://magicapp-28c55.firebaseio.com",
  projectId: "magicapp-28c55",
  storageBucket: "",
  messagingSenderId: "67659599649",
  appId: "1:67659599649:web:dffe649550cdd078"
};


  firebase.initializeApp(config);

  const database = firebase.database()
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


  const auth = firebase.auth();
  const firestore = firebase.firestore();


  export { firebase, googleAuthProvider, firestore, auth, database as default}  

