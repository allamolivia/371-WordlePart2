<script setup lang="ts">
    import { ref, Ref, onMounted } from 'vue'
    import { addDoc,
          collection, 
          CollectionReference, 
          DocumentReference, 
          Firestore,
          getFirestore,
          QuerySnapshot,
          collectionGroup,
          getDocs, doc, getDoc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
    import {
        getAuth,
        Auth,
        signOut,
        User } from "firebase/auth"
     import { dataType } from "./dataTypes.vue"

    var auth: Auth | null = null
    var user: User | null = null
    const db:Firestore = getFirestore();
    const dataArr: Ref<DocumentData[]> = ref([])

    onMounted(() => {
      auth = getAuth();
      auth!.onAuthStateChanged(user => {
            if (user) {
                console.log(!auth)
                const userColl = collection(db, "users");
                getDocs(userColl)
                    .then((myQueryRes: QuerySnapshot) => {
                    myQueryRes.forEach((myDoc: QueryDocumentSnapshot) => {
                        const stData = myDoc.data();
                        console.log(myDoc.id, stData.word);
                    }
                )});

                let games:CollectionReference;
                games = collection(db, `users/${ auth!.currentUser!.uid }/games`);
                getDocs(games)
                    .then((gamesQuery: QuerySnapshot) => {
                        gamesQuery.forEach((myGame:QueryDocumentSnapshot) => {
                            dataArr.value.push(myGame.data())
            });
        });
            }
            else {
            // User is signed out.

            }
        })
    })

</script>

<template>
    <h1>Your Game Stats!</h1>
    <table>
        <tr>
            <th>Secret Word</th>
            <th>Guessed Words</th>
            <th>Win/Loss</th>
            <th>Duration (s)</th>
            <th>Date</th>
        </tr>
        <tr v-for="gameData in dataArr">
            <td>{{gameData.word}}</td>
            <td><span v-for="word in gameData.guessedWords">{{word}}, </span></td>
            <td v-if="gameData.gameResult">Win</td>
            <td v-else>Loss</td>
            <td>{{ gameData.time }}</td>
            <td>{{ gameData.date }}</td>
        </tr>
    </table>
</template>

<style scoped>
    table, th, td {
        border: 1px solid;
    }
</style>