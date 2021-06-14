import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAbUSenVUnf4gaffvn8s_BNz6Ysx9dXg9Y",
    authDomain: "indulgeapp-c75ab.firebaseapp.com",
    databaseURL: "https://indulgeapp-c75ab.firebaseio.com",
    projectId: "indulgeapp-c75ab",
    storageBucket: "indulgeapp-c75ab.appspot.com",
    messagingSenderId: "525171650676",
    appId: "1:525171650676:web:b0f2f40e6036782043e121"
};

firebase.initializeApp(firebaseConfig)

export default firebase;
