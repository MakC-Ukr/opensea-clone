import firebase from 'firebase/compat/app'
// import dotenv from 'dotenv'
// await dotenv.config();
// require("dotenv").config();


const config = {
  apiKey: "AIzaSyAjZ3RuC7uEQpTSK2lhT-Brv_k8OZM3bO8",
  authDomain: "opensea-clone-2c8b3.firebaseapp.com",
  databaseURL: "https://opensea-clone-2c8b3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "opensea-clone-2c8b3",
  storageBucket: "opensea-clone-2c8b3.appspot.com",
  messagingSenderId: "708547343172",
  appId: "1:708547343172:web:fb95b367888a6f5f02dd11"
};

firebase.initializeApp(config);

export default firebase;

