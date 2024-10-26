import React, {useState, useEffect} from "react";
import {View, Text, Dimensions, ActivityIndicator, TouchableOpacity, Alert, TextInput, Image } from 'react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Button from "./Button";
import { signOutUser } from "../functions/authFunctions";
import { useSelector } from "react-redux";
import openMedia from "../functions/openMedia";
import { auth, db, doc, updateDoc} from '../firebase/configs'
import updateDetails from '../functions/updateDetails'
import uploadFile from '../functions/uploadFile'
import { fetchDetails } from "../functions/fetchDetails";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Loader from "../modals/Loader";
import avatar from '../assets/pictures/avatar.jpeg'
import admin from '../assets/pictures/admin.png'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const DrawerContent = ()=>{
    const userId= useSelector(state=>state.authState.userToken)
    const accountDetails = useSelector(state=>state.accountState)
    const [name, setName] = useState(accountDetails.firstName)
    const [surname, setSurname] = useState(accountDetails.lastName)
    const [email, setEmail] = useState(accountDetails.email)
    const [pic, setPic] = useState(accountDetails.profilePic)
    const [isVisible, setIsVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const navigation = useNavigation()
    
    useEffect(()=>{
        setName(accountDetails.firstName)
        setSurname(accountDetails.lastName)
        setEmail(accountDetails.email)
        setPic(accountDetails.profilePic)
    },[accountDetails])

        const logout =async()=>{
            const errM = await signOutUser()
            navigation.dispatch(DrawerActions.closeDrawer());
            if(errM !==null){
                alert(errM)
            }
        }

        const handleOpenMedia = async()=>{
            
            try {
                const {uri, name} = await openMedia()
                setIsLoading(true)
                const photoUrl = await uploadFile(uri, name, 'profile pictures')
                
                //const user = auth.currentUser
                const docRef = doc(db, "clients", userId);
                await updateDoc(docRef, {
                    profilePic:photoUrl});
                setIsLoading(false)
                fetchDetails(userId)

            } catch (error) {
                setIsLoading(false)
            }
        }


        const handleUpdate = async()=>{
            try {
                setIsVisible(true)
                const errorMsg = await updateDetails({firstName:name,lastName:surname, email})
                alert("Successfully updated")
                if(errorMsg !== null)
                    alert(errorMsg) 

                updateDetails(userId)
                setIsVisible(false)
            } catch (error) {
                alert(error.message) 
                setIsVisible(false)
            }
        }

        // {
        //     isLoading ?(<View style={{alignItems:'center', justifyContent:'center', width:'100%', height:'100%'}}>
        //         <ActivityIndicator size='small' color='#f5f5f5'/>
        //         </View>
        //         ): <Image source={ pic === null ? null : {uri:pic}} style={{width:'100%', height:'100%', borderRadius:100}}/>
        //}
    
    
    return(
        <View style={{flex:1, backgroundColor:'#ffffff', paddingVertical:15, flexDirection:'column', alignItems:'center', justifyContent:'space-between', paddingVertical:45, paddingHorizontal:25}}>

           <View style={{width:'100%',flexDirection:'column', alignItems:'center', marginTop:0.15*height}}>
                        {
                            accountDetails.role === "Normal" ? (
                            <TouchableOpacity onPress={handleOpenMedia} style={{backgroundColor:'#f5f5f5', height:.52*width, width:.52*width, borderRadius:100, borderColor:'#16abd5', borderWidth:2, alignItems:'center', justifyContent:'center'}}>
                                    { isLoading ? (
                                        <ActivityIndicator size={'large'} color={'#16abd5'}/>
                                    ):(
                                        <Image source={ pic === null ? avatar : {uri:pic}} style={{width:'100%', height:'100%', borderRadius:100}}/>
                                    )
                                    }
                            </TouchableOpacity>
                            ):(
                                <View style={{backgroundColor:'#f5f5f5', height:.52*width, width:.52*width, borderRadius:100, borderColor:'#16abd5', borderWidth:2}}>
                                    <Image source={ admin } style={{width:'100%', height:'100%', borderRadius:100}}/>
                                </View>
                            )
                        }
                        
                <View style={{width:'100%',flexDirection:'column', marginTop:20}}>
                    <View style={{marginBottom:30}}>
                        <Text style={{fontSize:0.039*width, color:'#000000'}}>Username</Text>
                        <TextInput
                            value={name}
                            onChangeText={(val)=>setName(val)}
                            style={{fontSize:0.05*width,fontWeight:'bold', color:'#000000'}}
                        />

                    </View>

                    <View style={{marginBottom:30}}>
                        <Text style={{fontSize:0.039*width, color:'#000000'}}>Surname</Text>
                        <TextInput
                            value={surname}
                            onChangeText={(val)=>setSurname(val)}
                            style={{fontSize:0.05*width,fontWeight:'bold', color:'#000000'}}
                        />

                    </View>

                    <View style={{marginBottom:30}}>
                        <Text style={{fontSize:0.039*width, color:'#000000'}}>Email</Text>
                        <TextInput
                            value={email}
                            onChangeText={(val)=>setEmail(val)}
                            style={{fontSize:0.05*width,fontWeight:'bold', color:'#000000'}}
                        />

                    </View>
                </View>

           </View>
                        {
                             accountDetails.role === "Normal" ? <Button name='Update' handlePress={handleUpdate}/> : null
                        }
           
           <Button name='Logout' handlePress={logout}/>
               
            <Loader isVisible={isVisible}/>
        </View>
    )
}

export default DrawerContent