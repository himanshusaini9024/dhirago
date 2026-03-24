import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBXQ5AVppvlc3zCgAl2p-Rzqhq_J-BGD_Y",
  authDomain: "dhirago-fashion.firebaseapp.com",
  projectId: "dhirago-fashion",
  appId: "1:201251535978:web:4f43591c067233435a5e13",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };