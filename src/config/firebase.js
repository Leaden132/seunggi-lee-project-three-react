  import firebase from 'firebase';
  import "firebase/firebase-database"
  
  

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAaOnua7SsS57dNKNaZO4A42-ql5IPD1yc",
    authDomain: "find-your-music-1a255.firebaseapp.com",
    projectId: "find-your-music-1a255",
    storageBucket: "find-your-music-1a255.appspot.com",
    messagingSenderId: "430185502629",
    appId: "1:430185502629:web:957daa0c769c4e6111ba4c"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;