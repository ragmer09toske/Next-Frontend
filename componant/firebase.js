// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFboA4xW26HBWsgO_Bs_tbwGWjoQKcN3A",
  authDomain: "next-raymond09.firebaseapp.com",
  projectId: "next-raymond09",
  storageBucket: "next-raymond09.appspot.com",
  messagingSenderId: "630282301670",
  appId: "1:630282301670:web:7421943a023e846c840b27",
  measurementId: "G-K34PHJHZ5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)