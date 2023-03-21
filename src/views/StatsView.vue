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
          getDocs, doc, getDoc, DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";
    import {
        getAuth,
        Auth,
        signOut,
        User } from "firebase/auth"

    var auth: Auth | null = null
    var user: User | null = null
    const db:Firestore = getFirestore();
    var dataArr = []

    onMounted(() => {
      auth = getAuth();
      user = auth.currentUser
    })

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
                dataArr.push(myGame.data())
            });
        });

</script>

<template>
    <h1>(User)'s Game Stats!</h1>
    <table>
        <tr>
            <th>Secret Word</th>
            <th>Guessed Words</th>
            <th>Win/Loss</th>
            <th>Duration (s)</th>
            <th>Date</th>
        </tr>
        <tr>
            <td></td>
        </tr>
    </table>
</template>