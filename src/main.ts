import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import {getFirestore, Firestore, collection} from "firebase/firestore"
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp,FirebaseApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACKjAtFI8129kBAPbtONcFtYAihoXjyeU",
  authDomain: "wordleauth1.firebaseapp.com",
  projectId: "wordleauth1",
  storageBucket: "wordleauth1.appspot.com",
  messagingSenderId: "1028043329956",
  appId: "1:1028043329956:web:24ba03bc9150c3da15f131"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {createRouter, createWebHashHistory} from "vue-router"
import HelloWordle from "./views/HelloWordle.vue"
import LoginView from "./views/LoginView.vue"
import SignUpView from "./views/SignUpView.vue"

const myComponentRoutes = [
    { path: "/", component: HelloWordle },
    { path: "/login", component: LoginView },
    { path: "/signup", component: SignUpView },
];

const myRouter = createRouter({
    history: createWebHashHistory(),
    routes: myComponentRoutes 
  })

const myApp: FirebaseApp = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(myApp);
createApp(App).use(myRouter).mount("#app");

const users = collection(db, "users")