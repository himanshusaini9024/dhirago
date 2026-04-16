import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzXY7HJ4yp3Sg6_3GXYF9H9WIF67rp6fs",
  authDomain: "dhirago-11891.firebaseapp.com",
  projectId: "dhirago-11891",
  storageBucket: "dhirago-11891.firebasestorage.app",
  messagingSenderId: "148288812465",
  appId: "1:148288812465:web:674a451617aaa8db39f990"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);