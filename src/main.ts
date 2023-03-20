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
  apiKey: "AIzaSyCjht2fDd_AZD07_37Y9Fwx6OKvGDJ24PQ",
  authDomain: "wordle-9641a.firebaseapp.com",
  projectId: "wordle-9641a",
  storageBucket: "wordle-9641a.appspot.com",
  messagingSenderId: "661917375936",
  appId: "1:661917375936:web:8290f4675ae45e84ff3c25",
  measurementId: "G-4HR6YHN10Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {createRouter, createWebHashHistory} from "vue-router"
import HelloWordle from "./views/HelloWordle.vue"
import LoginView from "./views/LoginView.vue"
import SignUpView from "./views/SignUpView.vue"
import StatsView from "./views/StatsView.vue"

const myComponentRoutes = [
    { path: "/", component: HelloWordle },
    { path: "/login", component: LoginView },
    { path: "/signup", component: SignUpView },
    { path: "/stats", component: StatsView }
];

const myRouter = createRouter({
    history: createWebHashHistory(),
    routes: myComponentRoutes 
  })

const myApp: FirebaseApp = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(myApp);
createApp(App).use(myRouter).mount("#app");

const users = collection(db, "users")