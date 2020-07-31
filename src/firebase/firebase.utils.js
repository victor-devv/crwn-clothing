import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDfwLUMtqwcORTp-x2qXn5A8bYbbQCTMX4",
  authDomain: "crwn-db-25327.firebaseapp.com",
  databaseURL: "https://crwn-db-25327.firebaseio.com",
  projectId: "crwn-db-25327",
  storageBucket: "crwn-db-25327.appspot.com",
  messagingSenderId: "691319201684",
  appId: "1:691319201684:web:a8265d7d817934e3bb7981",
  measurementId: "G-PXPWT9SENM",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
