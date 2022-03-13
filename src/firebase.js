import firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBsq4sLDKGxuDvKfL6odDT8T6515IJ6hCY",
  authDomain: "crud-ea593.firebaseapp.com",
  projectId: "crud-ea593",
  storageBucket: "crud-ea593.appspot.com",
  messagingSenderId: "173349414492",
  appId: "1:173349414492:web:33c8ea50a96e83ab576899",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();