// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "native-3031a.firebaseapp.com",
  projectId: "native-3031a",
  storageBucket: "native-3031a.appspot.com",
  messagingSenderId: process.env.senderId,
  appId: process.env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }