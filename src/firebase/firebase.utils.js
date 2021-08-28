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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // const collectionRef = firestore.collection('users');

  //userRef is a queryReference object. You can also query a collection by firestore.collections('/users')
  // queryReference obj doesnt have the actual data of either the document or collection. It only has properties that tells us details about it, or has the method that gets the data we aer looking for

  // query ref from doc == documentRef obj, from collection == collectionRef obj

  //documentRef obj are used to perform CRUD. documentRef methods are .set(), .get(), .update(), .delete()
  // We can add documents to collections using .add()
  
  // documentRef returns documentSnapshot object
  // collectionRef returns a querySnapshot object

  const snapShot = await userRef.get();

  // const collectionSnapshot = await collectionRef.get();
  // console.log( { collection: collectionSnapshot.docs.map(doc => doc.data()) } );

  //check if document exists in snapshot. You can get the props of the object by calling .data() which returns a JSON object
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //create new document inside the db
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
      
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//   const collectionRef = firestore.collection(collectionKey);
//   // console.log(collectionRef);

//   const batch = firestore.batch();
//   objectsToAdd.forEach(obj => {
//     const newDocRef = collectionRef.doc();
//     batch.set(newDocRef, obj)
//     // console.log(newDocRef);
//   })

//   return await batch.commit()
// };

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
