import React, {useState} from "react";
import {View, Text, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import Button from "../components/AuthButton";
import { useNavigation } from "@react-navigation/native";
import logo from '../assets/pictures/logo.png'
import { signIn } from "../functions/authFunctions";
import Loader from "../modals/Loader";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Login = ()=>{

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation()

    const login=async()=>{

        if(email ==='' && pass==''){
            alert("Both email and password are required")
            return
        }

        if(email ===''){
            alert("Email is required")
            return
        }

        if(pass==''){
            alert("Password is required")
            return
        }
        
        setIsLoading(true)
        const errM = await signIn(email, pass)
        setIsLoading(false)
        if(errM !== null){
            alert(errM)
        }

    }

    return(
        <View style={{flex:1, backgroundColor:'#ffffff', flexDirection:'column', alignItems:'center', paddingVertical:.11*height}}>
            <View style={{alignItems:'center'}}>
                <View style={{width:.4*width, height:.4*width, borderRadius:100, marginBottom:12}}>
                    <Image source={logo} style={{width:'100%', height:'100%', borderRadius:100}}/>
                </View>
                <Text style={{fontSize:.06*width, color:'#000000'}}>Metro on the go!</Text>
            </View>

            <View style={{marginTop:.12*height, marginBottom:.045*height}}>
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
                        style={{width:.7*width, fontSize:.045*width, borderBottomWidth:2, borderBottomColor:'lightgrey'}}
                        placeholderTextColor={'lightgrey'}
                        placeholder="Password"
                    />
                </View>
            </View>

            <View style={{alignItems:'center'}}>
                <View style={{flexDirection:'row', justifyContent:'flex-end', width:'80%', marginBottom:30}}>
                  <TouchableOpacity style={{flexDirection:'row', marginTop:20}} onPress={()=>navigation.navigate('Forgot password')}>
                    <Text style={{fontSize:.032*width, color:'grey', fontWeight:'bold'}}> Forgot password? </Text>
                  </TouchableOpacity>
                </View>
                <Button name="LOGIN" handlePress={login} />
                <TouchableOpacity style={{flexDirection:'row', marginTop:20}} onPress={()=>navigation.navigate('Register')}>
                    <Text style={{fontSize:.032*width, color:'grey'}}>Don't have an account? </Text>
                    <Text style={{fontSize:.032*width, color:'grey', fontWeight:'bold'}}>Register</Text>
                </TouchableOpacity>
            </View>
            <Loader isVisible={isLoading}/>
        </View>
    )
}

export default Login