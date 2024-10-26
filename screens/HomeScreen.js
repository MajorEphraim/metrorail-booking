import React, { useEffect } from "react";
import {View, Text, FlatList, Image, Dimensions, TouchableWithoutFeedback} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { fetchDetails, getDetails } from '../functions/fetchDetails'
import { useDispatch } from "react-redux";
import { updateAccountDetails } from "../redux/slices/accountSlice";
import * as SecureStore from 'expo-secure-store';
import { auth, onAuthStateChanged } from '../firebase/configs'

import { fetchBookings } from "../functions/fetchBookings";
import fetchSchedule from "../functions/fetchSchedule";
import { fetchTransHistory } from "../functions/fetchTransHistory";

import Header from "../components/Header";
import bookings from '../assets/bookings.png'
import trans_hist from '../assets/trans_hist.png'
import make_payment from '../assets/make_payment.png'
import tickets from '../assets/tickets.png'

const Home = ()=>{
    const data = [
        {name:'All Bookings', navScreen:'All bookings', pic:bookings},
        {name:'Transaction History', navScreen:'Transaction history', pic:trans_hist},
        {name:'Make Payment', navScreen:'Make payment', pic:make_payment},
        {name:'My Tickets', navScreen:'My tickets', pic:tickets},
    ]

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const fetchLocalDetails = async()=>{
        const accountDetails =  JSON.parse(await SecureStore.getItemAsync('account_details'))
        if(accountDetails !== null && accountDetails !== undefined){
            dispatch(updateAccountDetails(accountDetails))
        }
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            
            if (user) {

                const metadata = user.metadata
                if(metadata.creationTime === metadata.lastSignInTime)
                    return
              const uid = user.uid;
              
              getDetails(uid)
              fetchBookings(uid)
              fetchTransHistory(uid)
            } 
          }); 
    },[])

    useEffect(()=>{
        fetchLocalDetails()
        fetchSchedule()
      
    },[])

    return(
        <View style={{flex:1, backgroundColor:'#ffffff'}}>
            <Header/>
            <View style={{justifyContent:'space-between', alignItems:'center', marginTop:30, marginBottom:40}}>
                {
                    data.map(item=>(
                        <TouchableWithoutFeedback key={item.name} onPress={()=>navigation.navigate(item.navScreen)}>
                            <View style={{backgroundColor:'#f5f5f5', height:105, width:'93%', borderRadius:20,padding:10,margin:10, flexDirection:'row', alignItems:'center'}}>
                                <View style={{width:80, height:80, borderRadius:100, marginRight:10}}>
                                    <Image source={item.pic} style={{width:'100%', height:'100%'}}/>
                                </View>
                                <Text style={{fontSize:23, color:'#000000'}}>{item.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </View>

        </View>
    )
}

export default Home

