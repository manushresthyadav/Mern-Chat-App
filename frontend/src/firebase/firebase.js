// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABZxdAmlz6LUkA529_-KFxV-xEYhIJB6I",
  authDomain: "whatsapp-mern-stack-e94c7.firebaseapp.com",
  projectId: "whatsapp-mern-stack-e94c7",
  storageBucket: "whatsapp-mern-stack-e94c7.appspot.com",
  messagingSenderId: "104089213257",
  appId: "1:104089213257:web:ae40f186b1fb00aa886298"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);