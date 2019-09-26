import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAbpUwXBvm4oEaDkuwuve6uKV1c-H8OGmc",
    authDomain: "crwn-db-823c1.firebaseapp.com",
    databaseURL: "https://crwn-db-823c1.firebaseio.com",
    projectId: "crwn-db-823c1",
    storageBucket: "",
    messagingSenderId: "1027306465977",
    appId: "1:1027306465977:web:1047b9db04f39efb"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`/users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  }

  export const addCollectionAndDocuments = async (collectionKey, DocumentToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    DocumentToAdd.forEach(doc => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, doc);
    })
    return await batch.commit();
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;