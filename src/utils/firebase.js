import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8UrxoEf_7A-E2Ej0EGFhsf_9JnQbaVBk",
  authDomain: "musicfy-v2-128a3.firebaseapp.com",
  projectId: "musicfy-v2-128a3",
  storageBucket: "musicfy-v2-128a3.appspot.com",
  messagingSenderId: "207845020483",
  appId: "1:207845020483:web:4e4a1502bb44c996cdd5f6",
};

export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);
