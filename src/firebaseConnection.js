// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLyWpofVxZ3Qkd4q5sG7IQ0XVtOHVSxH8",
  authDomain: "tarefapost.firebaseapp.com",
  projectId: "tarefapost",
  storageBucket: "tarefapost.appspot.com",
  messagingSenderId: "1016421008017",
  appId: "1:1016421008017:web:db550d816d65ecd7d37530"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };