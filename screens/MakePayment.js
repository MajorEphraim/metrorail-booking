import React from "react";
import {View, Text, Dimensions } from 'react-native'
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const data =[
    {name:'Account holder name', value:'Metrorail'},
    {name:'Bank name', value:'Standard bank'},
    {name:'Account number', value:'1234567890'},
    {name:'Branch code', value:'131410'},
    {name:'Account type', value:'Savings'},
    {name:'Reference', value:'Ticket #'},
]

const MakePayment = ()=>{
    const navigation = useNavigation()

    const done =()=>{
        navigation.goBack()
    }

    return(
        <View style={{flex:1, backgroundColor:'#ffffff', alignItems:'center', justifyContent:'space-between', padding:45}}>
            <View/>
            <View style={{width, paddingLeft:20}}>
                <View>
                    {
                        data.map(item=>(
                            <View key={item.name} style={{marginBottom:15}}>
                                <Text style={{fontSize:.04*width, color:'#3f4040'}}>{item.name}</Text>
                                <Text style={{fontSize:.055*width, color:'#3f4040', fontWeight:'bold'}}>{item.value}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
            <Button name='Done' handlePress={done} /> 
        </View>
    )
}

export default MakePayment