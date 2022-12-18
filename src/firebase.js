// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore 
 } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_KEY,
  authDomain: "budgetingworks-app.firebaseapp.com",
  databaseURL: "https://budgetingworks-app-default-rtdb.firebaseio.com",
  projectId: "budgetingworks-app",
  storageBucket: "budgetingworks-app.appspot.com",
  messagingSenderId: "685947689146",
  appId: process.env.REACT_APP_FIRE_APP_ID,
  measurementId: process.env.REACT_APP_FIRE_MID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);