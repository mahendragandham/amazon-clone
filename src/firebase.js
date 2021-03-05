import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyByuVfDOmr91lV2iZB3EaGl9x8Tn8L5KfU",
  authDomain: "clone-cea0b.firebaseapp.com",
  projectId: "clone-cea0b",
  storageBucket: "clone-cea0b.appspot.com",
  messagingSenderId: "855765567895",
  appId: "1:855765567895:web:34f42b4e04818c84ae9cd2",
  measurementId: "G-LQ9G9L1W80"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };