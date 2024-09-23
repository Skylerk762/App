import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDzaSntugO00uvQ5kyUUfwQkSK92frTfSk",
  authDomain: "projetoconjuntojs.firebaseapp.com",
  projectId: "projetoconjuntojs",
  storageBucket: "projetoconjuntojs.appspot.com",
  messagingSenderId: "422700991675",
  appId: "1:422700991675:web:4e748b501701a15e9f959e"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);