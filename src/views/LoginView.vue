<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import {
    getAuth,
    Auth,
    UserCredential,
    signInWithEmailAndPassword,
  } from "firebase/auth"
import { DocumentReference, setDoc, doc, Firestore } from "@firebase/firestore";

    const u_email = ref("")
    const u_pass = ref("")
    const message = ref(" ")
    var auth: Auth | null = null

    function isValidInput(): boolean {
        return u_email.value.length > 0 && u_pass.value.length > 0
    }

    onMounted(() => {
      auth = getAuth();
    })

    function withEmail(): void {
    signInWithEmailAndPassword(auth!, u_email.value, u_pass.value)
      .then(async (cr: UserCredential) => {
        console.log("login successfull.")
        message.value=("login successful!")
      })
      .catch((err: any) => {
        //console.log(`Unable to login ${err}`);
        //message.value=(`Unable to login ${err}`)
        if (err == "FirebaseError: Firebase: Error (auth/invalid-email).") {
          message.value="Incorrect username or password"
        } else {
          message.value=(`Unable to login. ${err}`)
        }
      });
  }

  //const doc1: DocumentReference = doc()
  
  </script>

<template>
  <div id="outerdiv">
    <h2>Sign In</h2>
    <div id="signupbox">
      <div class="inputdiv">
        <input v-model="u_email" type="text"
        placeholder="Enter your email">
      </div>
      <div class="inputdiv">
        <input type="password" v-model="u_pass"
          placeholder="Enter your password">
      </div>
    </div>
    <div id="SignUp">
      <button :disabled="!isValidInput"
        @click="withEmail">Sign in</button>
    </div>
    <p>{{ message }}</p>
</div>
</template>

<style scoped>
  #outerdiv {
    vertical-align:top;
  }

  #signupbox {
    margin-bottom:50px;
  }

  .inputdiv {
    margin-top: 15px;
  }
</style>
