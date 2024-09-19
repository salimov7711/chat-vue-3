import { initializeApp } from 'firebase/app'
import { getFirestore,  collection ,} from 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyA4oWSSRNGP5SYkrsGkg0yaMTdDuMqFBww",

  authDomain: "chat-app-1114c.firebaseapp.com",

  databaseURL: "https://chat-app-1114c-default-rtdb.firebaseio.com",

  projectId: "chat-app-1114c",

  storageBucket: "chat-app-1114c.appspot.com",

  messagingSenderId: "50394955426",

  appId: "1:50394955426:web:b8f2192b6b7691e758e1fb",

  measurementId: "G-S3CMKW0X7V"

})