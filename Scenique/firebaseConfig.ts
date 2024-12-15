// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWL3ji-XuQ4oWct01gHkGYqimSOcR_mdk",
  authDomain: "scenique-b1005.firebaseapp.com",
  projectId: "scenique-b1005",
  storageBucket: "scenique-b1005.firebasestorage.app",
  messagingSenderId: "381666480",
  appId: "1:381666480:web:bbce6a65c2aecac0ebe775",
  measurementId: "G-NTKE9WF3C8",
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const FIREBASE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB };
