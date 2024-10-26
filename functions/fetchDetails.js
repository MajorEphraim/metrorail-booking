import {auth, updateProfile, db, collection,doc, setDoc, getDoc, where, query, onSnapshot, getDocs} from '../firebase/configs'
import { updateAccountDetails } from '../redux/slices/accountSlice'
import { updateAllUsers } from '../redux/slices/usersSlice';
import store from '../redux/store'
import * as SecureStore from 'expo-secure-store';


const fetchDetails = (userId)=>{
        try {
          
                const accountQuery = query(collection(db, "clients"), where('clientId', '==', userId))

                const unsubscribe = onSnapshot(accountQuery, (querySnapshot) => {
                   querySnapshot.forEach(async(doc) => {
                       await SecureStore.setItemAsync('account_details',JSON.stringify(doc.data()));
                        store.dispatch(updateAccountDetails(doc.data()))  
                    }); 
                });
        } catch (error) {
            console.log(error.message)
        }

        return null
}

const fetchAdminDetails = (userId)=>{
        try {
          
                const accountQuery = query(collection(db, "administrators"), where('adminId', '==', userId))

                const unsubscribe = onSnapshot(accountQuery, (querySnapshot) => {
                   querySnapshot.forEach(async(doc) => {
                       await SecureStore.setItemAsync('account_details',JSON.stringify(doc.data()));
                        store.dispatch(updateAccountDetails(doc.data()))  
                    }); 
                });
        } catch (error) {
            console.log(error.message)
        }

        return null
}

const getDetails = async(userId)=>{
   
    let errorMsg = null
    try {
        const docRef = doc(db, "clients", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            await SecureStore.setItemAsync('account_details',JSON.stringify(docSnap.data()));
          store.dispatch(updateAccountDetails(docSnap.data()))
    
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    } catch (error) {
        errorMsg = error.message
    }

    return errorMsg
}

const getAdminDetails = async(userId)=>{
   
    let errorMsg = null
    try {
        const docRef = doc(db, "administrators", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            await SecureStore.setItemAsync('administrator',JSON.stringify(docSnap.data()));
          store.dispatch(updateAccountDetails(docSnap.data()))
    
        } else {
          // doc.data() will be undefined in this case
          console.log("No such admin!");
        }
    } catch (error) {
        errorMsg = error.message
    }

    return errorMsg
}

const fetchAllUsers = ()=>{
    try {
      
            const accountQuery = query(collection(db, "clients"))

            const unsubscribe = onSnapshot(accountQuery, (querySnapshot) => {
                const users =[]
               querySnapshot.forEach(async(doc) => {
                    users.push({...doc.data(),...{id:doc.id}})
                }); 
                
                store.dispatch(updateAllUsers(users))  
            });
    } catch (error) {
        console.log(error.message)
    }

    return null
}

export {fetchDetails, getDetails, fetchAllUsers, getAdminDetails, fetchAdminDetails}
