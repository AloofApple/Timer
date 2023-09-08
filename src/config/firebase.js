// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDHL4nIK1ROfFkc2modVhGhWLsKdZ05ZsA",
  authDomain: "timer-8ed93.firebaseapp.com",
  projectId: "timer-8ed93",
  storageBucket: "timer-8ed93.appspot.com",
  messagingSenderId: "1093288081622",
  appId: "1:1093288081622:web:0fba3a5ea22642a9e8f177",
  measurementId: "G-MQYTYHM5B7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);