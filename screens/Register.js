import React, {useState} from "react";
import {View, Text, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import Button from "../components/AuthButton";
import { useNavigation } from "@react-navigation/native";
import { signUp } from "../functions/authFunctions";
import Loader from "../modals/Loader";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

import logo from '../assets/pictures/logo.png'

const Register = ()=>{

    const [first, setFirst] = useState(null);
    const [last, setLast] = useState(null);
    const [email, setEmail] = useState(null);
    const [cell, setCell] = useState('');
    const [pass, setPass] = useState(null);
    const [confirmP, setConfirmP] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation()

    const register=async ()=>{
        
        if(first==null){
             alert("First name is required")
            return
        }

        if(last ===null){
            alert("Last name is required")
            return
        }
        
        if(email ===null){
            alert("Email is required")
            return
        }

        if(cell ===null){
            alert("Contact number is required")
            return
        }

         if(pass==null){
            alert("Password  is required")
            return
        }

        if(confirmP==null){
            alert("Please confirm your password")
            return
        }


        if(pass !==confirmP){
            alert("Passwords do not match")
            return
        }

        setIsLoading(true)
        const errM = await signUp(email, pass, first, last, cell)
        setIsLoading(false)
        if(errM !== null){
            alert(errM)
        }else{
            navigation.navigate("Login")
        }



    }

    return(
        <View style={{flex:1, backgroundColor:'#ffffff', flexDirection:'column', alignItems:'center', paddingVertical:.11*height}}>
            <View style={{alignItems:'center'}}>
                <View style={{width:.4*width, height:.4*width, borderRadius:100, marginBottom:12}}>
                    <Image source={logo} style={{width:'100%', height:'100%', borderRadius:100}}/>
                </View>
                <Text style={{fontSize:.055*width, color:'#000000'}}>Sign up</Text>
            </View>

            <View style={{marginTop:.05*height, marginBottom:.08*height}}>
                <View>
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

                    <TextInput
                        value={cell}
                        onChangeText={(val)=>setCell(val)}
                        style={{width:.7*width, fontSize:.045*width, borderBottomWidth:2, borderBottomColor:'lightgrey', marginBottom:25}}
                        placeholderTextColor={'lightgrey'}
                        placeholder="Contact number"
                    />

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
                </View>
            </View>

            <View style={{alignItems:'center'}}>
                <Button name="REGISTER" handlePress={register} />
                <TouchableOpacity style={{flexDirection:'row', marginTop:10}} onPress={()=>navigation.navigate('Login')}>
                    <Text style={{fontSize:.032*width, color:'grey'}}>Already have an account? </Text>
                    <Text style={{fontSize:.032*width, color:'grey', fontWeight:'bold'}}>Login</Text>
                </TouchableOpacity>
            </View>
            <Loader isVisible={isLoading}/>
        </View>
    )
}

export default Register