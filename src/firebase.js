import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg5_wORlzcmM2a3TITk82pSS6emjUP6is",
  authDomain: "classmanager-21f9c.firebaseapp.com",
  projectId: "classmanager-21f9c",
  storageBucket: "classmanager-21f9c.appspot.com",
  messagingSenderId: "41827980531",
  appId: "1:41827980531:web:6e4651ddfb1d57c836d386",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.auth();
firebase.storage();
export default firebase;
