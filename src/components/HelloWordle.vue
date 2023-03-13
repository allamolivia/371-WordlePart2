<script setup lang="ts">
import { ref, Ref } from 'vue'

const gameName = ref("Wordle Clone")
const words: Ref<string[]> = ref([ "Apple", "Bases", "Birds", "Crowd", "Crack", "Delta", "Doubt", "Dough", "Flyer", "Grand", "Giant", "Hello", "Handy",
"Igloo", "Karat", "Kayak", "Leeds", "Leary", "Matte", "Never", "Outgo", "Plate", "Pours", "Queue", "Rowdy", "Slack", "Showy","These",
  "Utter", "Vases", "Weird", "Xenon","Yards", "Zeros" ])
const strArray: Ref<string[]> = ref([]) 

var guessesUsed = 0
var secret = getSecretWord()
var guess = ""
var randWord = ""

function getSecretWord() {
  return words.value[Math.floor(Math.random() * 35)].toUpperCase()
}

function getGuess() {
  if (guessesUsed < 6) {
    strArray.value.push(guess.toUpperCase())
    guessesUsed++
  }
}

function newGame() {
  strArray.value.splice(0)
  guess = ""
  secret = words.value[Math.floor(Math.random() * 35)].toUpperCase()
  return secret
}

function showSecret() {
  return secret
}

function win() {
  if (guess.toUpperCase() === secret) {
    return "CONGRATULATIONS! YOU WIN!"
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

</script>

<template>

  <p>To build the grid of letters using Vue3 we created a v-for loop that would parse through each letter 
    in the array that was nested in a v-for loop that would give us the array of words. Afterwards they would 
    be checked by the v-if statements to create the background colors and cells. For our word matching algorithm, 
    we used a series of v-if-else statements to check whether the letter is a perfect match to the corresponding 
    letter in secret word so that box becomes green, then whether the letter was found anywhere in the secret 
    word so that the box becomes yellow, and finally if none of these conditions are true the box appears gray. </p>

  <h1>Wordle! By Olivia Allam & Jacob Strickland</h1>

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

  #button1 {
    margin-left: 10px;
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