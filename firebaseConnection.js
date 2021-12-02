import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyByYQe3n2XcyazvaRtyerXKoht2ksvAeb4',
  authDomain: 'meuapp-b73a0.firebaseapp.com',
  databaseURL: 'https://meuapp-b73a0-default-rtdb.firebaseio.com',
  projectId: 'meuapp-b73a0',
  storageBucket: 'meuapp-b73a0.appspot.com',
  messagingSenderId: '289357626610',
  appId: '1:289357626610:web:aa63d845b26e152c31e46b',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
