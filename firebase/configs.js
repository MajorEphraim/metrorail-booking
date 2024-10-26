// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore,collection, onSnapshot,
  query, where,getDocs, getDoc,addDoc,deleteDoc,
  updateDoc,setDoc,doc,increment, initializeFirestore, Timestamp, orderBy
  } from "firebase/firestore";
import {initializeAuth, getReactNativePersistence, getAuth, onAuthStateChanged,createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,sendEmailVerification,updateProfile, 
  signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFunctions, httpsCallable } from 'firebase/functions';
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBiJ0Hp4djrNky1B4Uy0qYXTGITmdTwPY",
  authDomain: "metrorail-booking.firebaseapp.com",
  projectId: "metrorail-booking",
  storageBucket: "metrorail-booking.appspot.com",
  messagingSenderId: "702665789962",
  appId: "1:702665789962:web:0214dba9a62d3923e8c5f3"
};

// Initialize Firebase
let app, auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
  });
  
  } else {
  app = getApp();
  auth = getAuth(app);
  }

const storage = getStorage(app);
const functions = getFunctions(app);
const db = getFirestore(app);

export { auth,createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, onAuthStateChanged,
  updateProfile,sendEmailVerification,signOut, db, collection,doc, getDocs,
  getDoc, addDoc, setDoc, storage,ref, uploadBytes, getDownloadURL,functions,
  updateDoc, query, where, onSnapshot, increment, deleteDoc, Timestamp, orderBy, httpsCallable }