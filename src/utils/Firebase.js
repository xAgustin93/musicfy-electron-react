import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCgZZwJXiapaawcM4PYqRKYPL4NFe8Mj80",
  authDomain: "musicfy-6871a.firebaseapp.com",
  databaseURL: "https://musicfy-6871a.firebaseio.com",
  projectId: "musicfy-6871a",
  storageBucket: "musicfy-6871a.appspot.com",
  messagingSenderId: "44180873807",
  appId: "1:44180873807:web:ae06941c8b46271c50003a"
};

export default firebase.initializeApp(firebaseConfig);
