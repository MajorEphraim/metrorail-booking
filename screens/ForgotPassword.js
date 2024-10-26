import React, {useState} from "react";
import {View, Text, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import Button from "../components/AuthButton";
import { useNavigation } from "@react-navigation/native";
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

import logo from '../assets/pictures/logo.png'

const ForgotPassword = ()=>{

    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const [confirmP, setConfirmP] = useState(null);

    const navigation = useNavigation()

    const updatePassword=()=>{

    }

    return(
        <View style={{flex:1, backgroundColor:'#ffffff', flexDirection:'column', alignItems:'center', paddingVertical:.11*height}}>
            <View style={{alignItems:'center'}}>
                <View style={{width:.4*width, height:.4*width, borderRadius:100, marginBottom:12}}>
                    <Image source={logo} style={{width:'100%', height:'100%', borderRadius:100}}/>
                </View>
                <Text style={{fontSize:.06*width, color:'#000000'}}>Forgot Password</Text>
            </View>

            <View style={{marginTop:.12*height, marginBottom:.08*height}}>
                <View>
                    <TextInput
                        value={email}
                        onChangeText={(val)=>setEmail(val)}
                        style={{width:.7*width, fontSize:.045*width, borderBottomWidth:2, borderBottomColor:'lightgrey', marginBottom:25}}
                        placeholderTextColor={'lightgrey'}
                        placeholder="Email"
                    />

                    <TextInput
                        value={pass}
                        onChangeText={(val)=>setPass(val)}
                        style={{width:.7*width, fontSize:.045*width, borderBottomWidth:2, borderBottomColor:'lightgrey',  marginBottom:25}}
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
                </View>
            </View>

            <View style={{alignItems:'center'}}>
                <Button name="UPDATE" handlePress={updatePassword} />
                <TouchableOpacity style={{flexDirection:'row', marginTop:20}} onPress={()=>navigation.navigate('Login')}>
                    <Text style={{fontSize:.032*width, color:'grey', fontWeight:'bold'}}>Go login? </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ForgotPassword