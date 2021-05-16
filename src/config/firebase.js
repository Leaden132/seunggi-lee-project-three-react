  import firebase from 'firebase';
  import "firebase/firebase-database"
  
  
  const firebaseConfig = {
    apiKey: "AIzaSyDuKIid4gbr1zIwYsvfrO5gtCof9VQJnQc",
    authDomain: "show-me-books-25cdf.firebaseapp.com",
    projectId: "show-me-books-25cdf",
    storageBucket: "show-me-books-25cdf.appspot.com",
    messagingSenderId: "760758900841",
    appId: "1:760758900841:web:1dc5e37984332773eceaf8"
  };


  //initialize firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;