// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBaA2qq8tLDThrWspR1Spu0Ze_l285BK-E",
    authDomain: "furniflex-f0c39.firebaseapp.com",
    projectId: "furniflex-f0c39",
    storageBucket: "furniflex-f0c39.appspot.com",
    messagingSenderId: "293564004304",
    appId: "1:293564004304:web:b0b46cc2ad9db8354eebd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;