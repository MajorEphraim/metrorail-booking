import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack, HomeStack } from './StackNavigator';
import DrawerNavigator from './DraweNavigator';
import { useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { auth, onAuthStateChanged } from '../firebase/configs'
import { signInUser } from '../redux/slices/authSlice';
import { fetchDetails, getDetails, getAdminDetails, fetchAdminDetails } from '../functions/fetchDetails';
import SplashScreen from '../screens/SplashScreen';
import store from '../redux/store';
//import { getAdminDetails } from '../functions/fetchDetails';

const Navigator = ()=>{

    const token = useSelector(state=>state.authState.userToken)
    const [isLoading, setIsLoading] = useState(false)
    const checkFirstTime = async()=>{
        try {
            setIsLoading(true)
            const authDetails =  JSON.parse(await SecureStore.getItemAsync('auth_details'))
            
            onAuthStateChanged(auth, (user) => {
             
              if (user) {
                const metadata = user.metadata
                if(metadata.creationTime === metadata.lastSignInTime)
                    return
                const uid = user.uid;
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                 // if(user.emailVerified){
                    store.dispatch(signInUser({userToken:uid, isSignedIn:true}))
                    fetchDetails(uid)
                    getDetails(uid)
                    getAdminDetails(uid)
                    fetchAdminDetails(uid)
                    //console.log("user ", uid)
                  //}
                // ...
              } else {
                // User is signed out
                // ...
                store.dispatch(signInUser({userToken:null, isSignedIn:false}))
                console.log("user is signed out or not connected")
              }
            }); 
            
            if (authDetails !== null && authDetails !== undefined ) {
                store.dispatch(signInUser({userToken:authDetails.userToken, isSignedIn:authDetails.isSignedIn}))
            } else {
                store.dispatch(signInUser({userToken:null, isSignedIn:false}))
            }
            
            // if (accountDetails !== null && accountDetails !== undefined) {
            //   dispatch(updateAccountDetails(accountDetails))
            // }
            setIsLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        checkFirstTime()
    },[])

    if(isLoading)
        return <SplashScreen/>

    return (
        <NavigationContainer> 
            {
                token ? <DrawerNavigator/> : <AuthStack/>
            }
        </NavigationContainer>
    )
}

export default Navigator