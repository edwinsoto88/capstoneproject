// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtzRJESz5QbYjuGqLgIdoLk8KuS39nBbY",

  authDomain: "unt-rides.firebaseapp.com",

  projectId: "unt-rides",

  storageBucket: "unt-rides.appspot.com",

  messagingSenderId: "947444931054",

  appId: "1:947444931054:web:c49dbcec220f8a960916ff",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {  db }
export { app, auth}
