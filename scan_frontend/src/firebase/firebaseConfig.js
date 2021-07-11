import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDwzeTPkQTs21TeAVqZCK8pxaX3eG9g_dw",
    authDomain: "scanlendar-48ab9.firebaseapp.com",
    projectId: "scanlendar-48ab9",
    storageBucket: "scanlendar-48ab9.appspot.com",
    messagingSenderId: "886053182719",
    appId: "1:886053182719:web:eea71865843763431840ca"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
