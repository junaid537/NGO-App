/**
 * src/firebase.js
 */
 //npm i firebase
 import firebase from "firebase/app";
 //import "firebase/auth";
 import { initializeApp } from "firebase/app";
 import { getAuth,onAuthStateChanged } from "firebase/auth";

  //ye credentials same hai backend kay firebase/credentials.json mei
 const firebaseConfig = {
    apiKey: "AIzaSyB6pmZ0CRzFuan3m23RU-zZgaczx24nXzU",
    authDomain: "junnu-98d7a.firebaseapp.com",
    projectId: "junnu-98d7a",
    storageBucket: "junnu-98d7a.appspot.com",
    messagingSenderId: "375868075499",
    appId: "1:375868075499:web:c6d6a21b9dc8b42f96fdae",
    measurementId: "G-ZBHSQM8X3M"
  };


const app = initializeApp(firebaseConfig);//initialize karrey credentials sety and storing in app

export const auth = getAuth(app);//getting auth from app , in this auth token will be passed so exporting it
// const auth = firebase.auth( );
