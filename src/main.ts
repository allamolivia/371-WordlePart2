import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import {initializeApp, FirebaseApp} from "firebase/app"
import {getFirestore, Firestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";

const config = { // COPY this from your Firebase Console
    apiKey: "AIzaSyCjht2fDd_AZD07_37Y9Fwx6OKvGDJ24PQ",
    authDomain: "wordle-9641a.firebaseapp.com",
    projectId: "wordle-9641a",
    storageBucket: "wordle-9641a.appspot.com",
    messagingSenderId: "661917375936",
    appId: "1:661917375936:web:8290f4675ae45e84ff3c25",
    measurementId: "G-4HR6YHN10Y"
};

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

const myApp: FirebaseApp = initializeApp(config);
const db:Firestore = getFirestore(myApp);
createApp(App).use(myRouter).mount("#app");
