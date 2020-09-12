import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

// QUERY DATA FROM FIRESTORE

firestore
  .collection("users")
  .doc("dOjTd9NcHbTt1iASgt4o")
  .collection("cartItmes")
  .doc("XUI7EFZSs3nl9wDkO1IH");

firestore.doc("/users/dOjTd9NcHbTt1iASgt4o/cartItems/XUI7EFZSs3nl9wDkO1IH");

firestore.collection("/users/dOjTd9NcHbTt1iASgt4o/cartItems/");
