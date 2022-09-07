const firebase = require("firebase-admin");

const credentials = require("./credentials.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://junnu.firebaseio.com",//from proj settings copied name of proj
});

module.exports = firebase;