import {  db, setDoc, doc,
    } from '../firebase/configs'
import { signInUser } from '../redux/slices/authSlice';
import {getDetails} from './fetchDetails'
import store from '../redux/store';
import * as SecureStore from 'expo-secure-store';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";

const auth = getAuth();

const signIn = async (email, password)=>{
    let errorMsg = null
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password) 
        
        const user = userCredential.user;
            await SecureStore.setItemAsync('auth_details',JSON.stringify({userToken:user.uid, isSignedIn:true}));
            await getDetails()
            store.dispatch(signInUser({userToken:user.uid, isSignedIn:true})) 
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorMsg=errorMessage
        
    }
    return errorMsg
}

const signUp = async (email, password, firstName, lastName, contactNo)=>{

    let errorMsg = null
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
       
        await setDoc(doc(db, "clients", user.uid), {
            firstName,
            lastName,
            email,
            profilePic: null,
            clientId: user.uid,
            contactNo
          });

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorMsg=errorMessage
    }

    return errorMsg
}

const signUpAdmin = async (email, password, firstName, lastName)=>{

    let errorMsg = null
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
       
        await setDoc(doc(db, "administrators", user.uid), {
            firstName,
            lastName,
            email,
            profilePic: null,
            adminId: user.uid,
            role:'Admin'
          });

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorMsg=errorMessage
    }

    return errorMsg
}

const signOutUser = async()=>{
    let errorMsg = null
    try {
        await signOut(auth)
        await SecureStore.deleteItemAsync('auth_details', {})
        await SecureStore.deleteItemAsync('account_details', {})

    } catch (error) {
        const errorMessage = error.message
        errorMsg=errorMessage
    }
    return errorMsg
}

export {signUp, signIn, signOutUser, signUpAdmin}