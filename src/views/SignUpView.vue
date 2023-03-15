<script setup lang="ts">
  import { onMounted } from "vue"
  import {
    getAuth,
    Auth,
    UserCredential,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
  } from "firebase/auth"

    var u_email = ""
    var u_pass = ""
    var auth: Auth | null = null
    var emailVerification = false

    function isValidInput(): boolean {
        return u_email.length > 0 && u_pass.length > 0
    }

    onMounted(() => {
      auth = getAuth();
    })

    function createAccount(): void {
      createUserWithEmailAndPassword(auth!, u_email, u_pass)
        .then(async (cr: UserCredential) => {
          if (emailVerification) {
            await sendEmailVerification(cr.user);
            await signOut(auth!);
            console.log("An email verification has been sent to ", cr.user?.email);  
            } else console.log("New account created with UID", cr.user?.email);
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
    <h1>Create Account</h1>
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
