import { initializeApp } from 'firebase/app'
import { getFirestore, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCkDOUMuajdAn6gqXx2V-IijHBKtvs18MM",
    authDomain: "truffle-dog-56562.firebaseapp.com",
    projectId: "truffle-dog-56562",
    storageBucket: "truffle-dog-56562.appspot.com",
    messagingSenderId: "1089038266414",
    appId: "1:1089038266414:web:f9b7c1237f3d4a5b0d6fbf"
  };

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
const timestamp = Timestamp;


export { db, auth, timestamp, storage }