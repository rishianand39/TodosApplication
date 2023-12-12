// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6P9a1269Ffr_317Cv6zvCZbOXFBaHDhI",
  authDomain: "imageupload-35cc9.firebaseapp.com",
  projectId: "imageupload-35cc9",
  storageBucket: "imageupload-35cc9.appspot.com",
  messagingSenderId: "840886184794",
  appId: "1:840886184794:web:3f3b13dcbad5a3b683e163",
  measurementId: "G-PY4J2F183R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);