import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCkDOUMuajdAn6gqXx2V-IijHBKtvs18MM",
    authDomain: "truffle-dog-56562.firebaseapp.com",
    projectId: "truffle-dog-56562",
    storageBucket: "truffle-dog-56562.appspot.com",
    messagingSenderId: "1089038266414",
    appId: "1:1089038266414:web:f9b7c1237f3d4a5b0d6fbf"
  };

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export { db, auth }