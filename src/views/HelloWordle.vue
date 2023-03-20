<script setup lang="ts">
import { ref, Ref, onMounted, defineProps, withDefaults } from 'vue'
import { addDoc, collection, CollectionReference, DocumentData, DocumentReference, setDoc, doc, Firestore, getFirestore } from "@firebase/firestore";
import {
    getAuth,
    Auth,
    UserCredential,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    User
  } from "firebase/auth"

import { dataType } from "./dataTypes.vue"
const gameName = ref("Wordle Clone")
const words: Ref<string[]> = ref([ "Apple", "Bases", "Birds", "Crowd", "Crack", "Delta", "Doubt", "Dough", "Flyer", "Grand", "Giant", "Hello", "Handy",
"Igloo", "Karat", "Kayak", "Leeds", "Leary", "Matte", "Never", "Outgo", "Plate", "Pours", "Queue", "Rowdy", "Slack", "Showy","These",
  "Utter", "Vases", "Weird", "Xenon","Yards", "Zeros" ])
const strArray: Ref<string[]> = ref([]) 
var auth: Auth | null = null
var user: User | null = null

onMounted(() => {
      auth = getAuth();
      user = auth.currentUser
    })

type TimerProp = {
  updateInterval: number
}

var guessesUsed = 0
var secret = getSecretWord()
var guess = ""
var randWord = ""
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
const db:Firestore = getFirestore();

var dateString = mm + '/' + dd + '/' + yyyy;

const props = withDefaults(defineProps<TimerProp>(), {updateInterval: 1000})
const seconds = ref(0)
let myTimer: Ref<number | null> = ref(null)

function getSecretWord() {
  return words.value[Math.floor(Math.random() * 35)].toUpperCase()
}

function getGuess() {
  if (guessesUsed < 6) {
    strArray.value.push(guess.toUpperCase())
    guessesUsed++
  }
  if (guessesUsed == 6 || guess.toUpperCase() === secret){
    endGame()
  }
}

function newGame() {
  strArray.value.splice(0)
  guess = ""
  secret = words.value[Math.floor(Math.random() * 35)].toUpperCase()
  guessesUsed = 0
  return secret
}

function showSecret() {
  return secret
}

function win() {
  if (guess.toUpperCase() === secret) {
    return "CONGRATULATIONS! YOU WIN!"
    if (myTimer.value != null) {
      clearInterval(myTimer.value)
      myTimer.value = null
    }
  } else {
    return ""
  }
}

function double(s: string, l: string, p: number) {
  for (var i=0; i < p; i++) {
    if (s[i] == l) {
      return 1
    }
  }
  return 0
}

// function updateTime() {
//   seconds.value++;
// }

// function stopTime() {
//   clearInterval(0)
// }

// function runTimer() {
//   myTimer.value = setInterval(updateTime, props.updateInterval)
// }

// onMounted(() => {
//   runTimer()
// })

function winLoss() {
  if (guess.toUpperCase() === secret) {
    return true
  } else {
    return false
  }
}

var getData: dataType = 
  {
    word: "",
    guessedWords: [],
    gameResult: false,
    time: 0,
    date: ""
  }

// var getData: dataType[] = [
//   {
//     word: secret,
//     guessedWords: strArray.value,
//     gameResult: winLoss(),
//     time: 100,
//     date: "3/19/2023"
//   }
// ]

function endGame() {
  // add all statistics and push to database
  getData.word = secret
  getData.guessedWords = strArray.value
  getData.gameResult = winLoss()
  getData.date = dateString
  let games:CollectionReference;
  games = collection(db, `users/${ auth!.currentUser!.uid }/games`);
  // or michCities = collection(db, “state”, “MI”, “cities”);
  addDoc(games,
    { word: getData.word, guessedWords: getData.guessedWords, 
      gameResult: getData.gameResult, time: getData.time, date: getData.date})
    .then((grDoc: DocumentReference) => {
    // your code here
    console.log("game created")
    })
    .catch((err:any) => { /* your code here */ });

}

</script>

<template>

  <!--p>To build the grid of letters using Vue3 we created a v-for loop that would parse through each letter 
    in the array that was nested in a v-for loop that would give us the array of words. Afterwards they would 
    be checked by the v-if statements to create the background colors and cells. For our word matching algorithm, 
    we used a series of v-if-else statements to check whether the letter is a perfect match to the corresponding 
    letter in secret word so that box becomes green, then whether the letter was found anywhere in the secret 
    word so that the box becomes yellow, and finally if none of these conditions are true the box appears gray. </p-->
  <p>
    <Timer></Timer>
  </p>
  <div id="routing">
    <button id="loginbutton"><RouterLink to="/login">Login</RouterLink></button>
    <button id="signupbutton"><RouterLink to="/signup">Sign Up</RouterLink></button>
  </div>
  
  <p>{{ win() }}</p>

  <div id="wordGrid">
    <span v-for="word in strArray">
        <span v-for="(letter, index) in word">
          <span v-if="letter == secret[index]" class="correct cell"> {{word[index]}}</span>
          <span v-else-if="secret.includes(letter)" class="almost cell"> {{word[index]}}</span>
          <span v-else="letter == secret[index]" class="incorrect cell"> {{word[index]}}</span>
        </span>
    </span>
  </div>

  <div id="inputWord">
      <input maxlength="5" v-model="guess" type="text">
  </div>

  <div id="buttons">
    <button id="button1" @click="newGame()">New Game</button>
    <button @click="getGuess" id="button2">Check</button>
    <button id="button3" @click="showSecret()">Show Word</button>
  </div>

</template>

<style scoped>
  #wordGrid {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 1fr); 
    height: 300px;
    width: 250px;
    grid-gap: 4px;
    margin: auto;
  }

  #inputWord {
    padding-top: 50px;
  }

  #buttons {
    padding-top: 50px;
  }

  .correct {
    background: green;
  }

  .almost {
    background: #FFD700;
  }

  .incorrect {
    background: gray;
  }
  .cell {
    color: white;
    border: 2px solid;
    padding: 1em;
    line-height: 0em;
  }

  #loginbutton {
    width: 150px;
  }

  #signupbutton {
    width: 150px;
    margin-left: 10px;
  }

  #routing {
    padding-bottom: 40px;
  }

  #button1 {
    width: 150px;
    justify-items: center;
  }
  #button2 {
    margin-left: 10px;
    width: 150px;
  }
  #button3 {
    margin-left: 10px;
    width: 150px;
    justify-items: center;
  }
</style>