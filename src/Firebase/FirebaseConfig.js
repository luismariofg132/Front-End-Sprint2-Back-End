import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAsODeaQkw7Um4Rne2HePeOrOaswmApR64",
    authDomain: "sprint-2-users.firebaseapp.com",
    projectId: "sprint-2-users",
    storageBucket: "sprint-2-users.appspot.com",
    messagingSenderId: "4602379405",
    appId: "1:4602379405:web:21cb5e7c9876b8a90936c4"
};

const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();

export {
    app, google
}