import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo91IKPmBIl1zX5IhALYmpOUn4hV8ceus",
  authDomain: "react-firebase-authentic-84f8f.firebaseapp.com",
  projectId: "react-firebase-authentic-84f8f",
  storageBucket: "react-firebase-authentic-84f8f.appspot.com",
  messagingSenderId: "499488828340",
  appId: "1:499488828340:web:1d4e0cb867318e60e5e0e1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
