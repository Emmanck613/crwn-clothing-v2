import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    
 } from 'firebase/auth';

 import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
 } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHgjV5u36BBqSnV1jzu7XJBbHQyuEwU-0",
    authDomain: "fbcrown-a2399.firebaseapp.com",
    projectId: "fbcrown-a2399",
    storageBucket: "fbcrown-a2399.appspot.com",
    messagingSenderId: "34811731948",
    appId: "1:34811731948:web:fab8a113be73c25d6deac9"
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

//collection data
export const addCollectionAndDocuments = async (
  collectionKey,
  ObjectsToAdd) => {

  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  //batch allows me to atach writes, delete, sets, etc
  ObjectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object); //we use batch set to create a new doc. ref for each object, with key as title and value as object 
  });
  //
  await batch.commit();
  console.log('Done')
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  //getDocs gets our document
  const quereSnapshot = await getDocs(q);
  //the snapshots are the data
  const categoryMap = quereSnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;

}

export const createUserDocumentFromAuth =  async(
  userAuth,
  additionalInfo = {}
  
  ) => {

  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  //console.log(userDocRef); 

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){ //if does not exist
    const { displayName, email } = userAuth;
    const createdAt = new Date();

  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInfo,
    }); 
  } catch (error){
    console.log('error creating user', error.message);
  }
  }

 return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return; 

 return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return; 

 return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);
//whenever this function is instated, it must give a callback
//what onAuthStateChange does is call its callback whenever the authentication
//state of our auth singleton changes, ej user signin
export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback );