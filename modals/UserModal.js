import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform,
        TouchableWithoutFeedback, FlatList,
        TextInput
    } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import Loader from './Loader'
import { signUp, signUpAdmin } from '../functions/authFunctions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const UserModal = ({isVisible,setIsVisible})=>{

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmP, setConfirmP] = useState('');
    const [cellNo, setCellNo] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const register=async ()=>{
      
        if(first==''){
             alert("First name is required")
            return
        }

        if(last ===''){
            alert("Last name is required")
            return
        }
        
        if(email ===''){
            alert("Email is required")
            return
        }

        if(!isAdmin && cellNo ===''){
            alert("Contact number is required")
            return
        }

         if(pass==''){
            alert("Password is required")
            return
        }

        if(confirmP==''){
            alert("Please confirm your password")
            return
        }

        if(pass !==confirmP){
            alert("Passwords do not match")
            return
        }

        setIsLoading(true)
        let errM 
        if(isAdmin){
            errM = await signUpAdmin(email, pass, first, last)
        }else{

             errM = await signUp(email, pass, first, last, cellNo)
        }
        setIsLoading(false)
        if(errM !== null){
            alert(errM)
        }else{
            setIsVisible(false)
            //navigation.navigate("Login")
        }



    }

    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', justifyContent:'flex-end'}}>
                <View style={{ backgroundColor:'#ffffff', height:.85*height, width, borderTopEndRadius:25, borderTopStartRadius:25, padding:15}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:0.041*width, fontWeight:'bold', }}>Add new user</Text>
                        <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                            <Text style={{fontSize:0.035*width, fontWeight:'500'}}>Close</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{marginTop:.09*height, height:'100%', alignItems:'center', }}>
            
                    <View style={{marginBottom:.14*height}}>
                        <TextInput
                            value={first}
                            onChangeText={(val)=>setFirst(val)}
                            style={{width:.7*width, fontSize:.045*width, borderBottomWidth:2, borderBottomColor:'lightgrey', marginBottom:25}}
                            placeholderTextColor={'lightgrey'}
                            placeholder="First Name"
                            />

                        <TextInput
                            value={last}
                            onChangeText={(val)=>setLast(val)}
                            style={{width:.7*width, fontSize:.045*width, borderBottomWidth:2, borderBottomColor:'lightgrey', marginBottom:25}}
                            placeholderTextColor={'lightgrey'}
                            placeholder="Last Name"
                        />

                        <TextInput
                            value={email}
                            onChangeText={(val)=>setEmail(val)}
                            style={{width:.7*width, fontSize:.045*width, borderBottomWidth:2, borderBottomColor:'lightgrey', marginBottom:25}}
                            placeholderTextColor={'lightgrey'}
                            placeholder="Email"
                        />

                            {

                                !isAdmin ?(
                                    <TextInput
                                    value={cellNo}
                                    onChangeText={(val)=>setCellNo(val)}
                                    style={{width:.7*width, fontSize:.045*width, borderBottomWidth:2, borderBottomColor:'lightgrey', marginBottom:25}}
                                    placeholderTextColor={'lightgrey'}
                                    placeholder="Contact number"
                                />
        
                                ):(null)
                            }
                       
                        <TextInput
                            value={pass}
                            onChangeText={(val)=>setPass(val)}
                            style={{width:.7*width, fontSize:.045*width, borderBottomWidth:2, borderBottomColor:'lightgrey', marginBottom:25}}
                            placeholderTextColor={'lightgrey'}
                            placeholder="Password"
                        />

                        <TextInput
                        value={confirmP}
                        onChangeText={(val)=>setConfirmP(val)}
                        style={{width:.7*width, fontSize:.045*width, borderBottomWidth:2, borderBottomColor:'lightgrey',}}
                        placeholderTextColor={'lightgrey'}
                        placeholder="Confirm Password"
                        />
                        {/* <View style={{width:'100%', flexDirection:'column', alignItems:'center', marginTop:20, backgroundColor:'red'}}> */}
                                 <TouchableOpacity style={{flexDirection:'row', paddingTop:20}} onPress={()=>setIsAdmin(!isAdmin)}>
                                    {
                                        isAdmin ? <MaterialCommunityIcons name='checkbox-marked-outline' size={0.065*width} color={'lightgrey'}/>:
                                                        <MaterialCommunityIcons name='checkbox-blank-outline' size={0.065*width} color={'lightgrey'}/>
                                                    }
                                                <Text style={{width:.7*width, fontSize:.045*width, color:'lightgrey', marginLeft:2}}>Make admin</Text>
                                </TouchableOpacity>                   
                        {/* </View> */}
                </View>
                {/* <Button name={"Add"} handlePress={()=>alert("changed")} /> */}
                <TouchableWithoutFeedback onPress={register}>
                    <View style={{height:40, width:150, backgroundColor:'#16abd5', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:20, color:'#ffffff'}}>{'Add user'}</Text>
                    </View>  
                </TouchableWithoutFeedback>
                <Loader isVisible={isLoading}/>
                </View>
            </View>
            </View>  
        </Modal>
    )
}

export default UserModal
