import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDscmHf74vlnRNThkIlAkBxtE8OkJma5oM",
    authDomain: "mypressure2.firebaseapp.com",
    projectId: "mypressure2",
    storageBucket: "mypressure2.appspot.com",
    messagingSenderId: "824095795775",
    appId: "1:824095795775:web:f173c06af64f0533e4268a",
    measurementId: "G-WBLP6X44RY"
};


export const FirebaseApp = firebase.initializeApp(config);
export const FirebaseDB = FirebaseApp.firestore();

// For Phone Auth
export const RecaptchaVerifier = firebase.auth.RecaptchaVerifier;

// Server Timestamp else it all client side timestamps
export const FirebaseTimestamp = () => {
    return firebase.firestore.FieldValue.serverTimestamp();
}

// Old One has Object Issues
export const FirebaseNewTimestamp = () => {
    return firebase.firestore.Timestamp.now().seconds;
}

// Init Analytics
// firebase.analytics();