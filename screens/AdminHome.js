import React, { useEffect } from "react";
import {View, Text, FlatList, Image, Dimensions, TouchableWithoutFeedback} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { fetchDetails, getDetails, fetchAllUsers, getAdminDetails } from '../functions/fetchDetails'
import { useDispatch } from "react-redux";
import { updateAccountDetails } from "../redux/slices/accountSlice";
import * as SecureStore from 'expo-secure-store';
import { auth, onAuthStateChanged } from '../firebase/configs'

import Header from "../components/Header";
import bookings from '../assets/bookings.png'
import trans_hist from '../assets/trans_hist.png'
import make_payment from '../assets/make_payment.png'
import train from '../assets/train.png'
import users from '../assets/users.png'

import fetchSchedule from "../functions/fetchSchedule";
import { fetchAllBookings } from "../functions/fetchBookings";
import { fetchAllTransHistory } from "../functions/fetchTransHistory";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Home = ()=>{
    const data = [
        {name:'Train Schedule', navScreen:'Train schedule', pic:train},
        {name:'All Bookings', navScreen:'Admin all bookings', pic:bookings},
        {name:'Transaction History', navScreen:'Admin transaction history', pic:trans_hist},
        {name:'Users Management', navScreen:'User management', pic:users},
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
              const uid = user.uid;
              
              getAdminDetails(uid)
            } 
          }); 
    },[])

    useEffect(()=>{
        fetchLocalDetails()
        fetchSchedule()
        fetchAllUsers()
        fetchAllBookings()
        fetchAllTransHistory()
    },[])

    return(
        <View style={{flex:1, backgroundColor:'#ffffff'}}>
            <Header/>
            <Text style={{fontSize:17, color:'#000000', paddingLeft:15}}>Admin</Text>
            <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems:'center', marginTop:.08*height, marginBottom:(14/300)*width}}>
                {
                    data.filter((item, index)=>index <2).map(item=>(
                        <TouchableWithoutFeedback key={item.name} onPress={()=>navigation.navigate(item.navScreen)}>
                            <View style={{backgroundColor:'#f5f5f5', height:.43*width, width:.43*width, borderRadius:20,justifyContent:'center', alignItems:'center'}}>
                                <View style={{flexDirection:'columnn', alignItems:'center'}}>
                                    <View style={{width:.24*width, height:.24*width, borderRadius:100, marginBottom:10}}>
                                        <Image source={item.pic} style={{width:'100%', height:'100%'}}/>
                                    </View>
                                    <Text style={{fontSize:.04*width, color:'#000000'}}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
                
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems:'center',}}>
                {
                    data.filter((item, index)=>index >1).map(item=>(
                        <TouchableWithoutFeedback key={item.name} onPress={()=>navigation.navigate(item.navScreen)}>
                            <View style={{backgroundColor:'#f5f5f5', height:.43*width, width:.43*width, borderRadius:20,justifyContent:'center', alignItems:'center'}}>
                                <View style={{flexDirection:'columnn', alignItems:'center'}}>
                                    <View style={{width:.24*width, height:.24*width, borderRadius:100, marginBottom:10}}>
                                        <Image source={item.pic} style={{width:'100%', height:'100%'}}/>
                                    </View>
                                    <Text style={{fontSize:.04*width, color:'#000000'}}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
                
            </View>


        </View>
    )
}

export default Home

