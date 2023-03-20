<script setup lang="ts">
  import { ref, onMounted } from "vue"
  import {
    getAuth,
    Auth,
    UserCredential,
    createUserWithEmailAndPassword,
  } from "firebase/auth"
  import {  DocumentReference, setDoc, doc, Firestore, getFirestore } from "firebase/firestore";

    const u_email = ref("")
    const u_pass = ref("")
    var auth: Auth | null = null
    var emailVerification = false
    const db:Firestore = getFirestore();

    function isValidInput(): boolean {
        return u_email.value.length > 0 && u_pass.value.length > 0
    }
    
    onMounted(() => {
      auth = getAuth();
    })

    function createAccount(): void {
      createUserWithEmailAndPassword(auth!, u_email.value, u_pass.value)
        .then(async (cr: UserCredential) => {
          console.log("New account created with UID", cr.user?.email);
          const doc1: DocumentReference = doc(db, `users/${cr.user.uid}`);
          setDoc(doc1, { })
            .then(() => {
              console.log("New doc added");
             })
          .catch((err:any) => { /* your code here */ });
          })
          .catch((err: any) => {
            console.log(`Unable to create account ${err}`); 
          })
          .catch((err: any) => {
            console.error("Oops", err);
          });
      }
  
  </script>

<template>
  <div id="outerdiv">
    <h2>Create Account</h2>
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
        @click="createAccount">Sign up</button>
    </div>
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
