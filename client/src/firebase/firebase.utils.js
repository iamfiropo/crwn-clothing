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

  export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });
    
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {})
  }

  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject)
    });
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;
