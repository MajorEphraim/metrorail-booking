import React from "react";
import { View, Text} from 'react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';

const Button = ({name,handlePress})=>{
    const navigation = useNavigation()
    return(
        <View style={{flexDirection:'row', justifyContent:'flex-end', paddingBottom:10, paddingRight:10}}>
            <View style={{flexDirection:'column', alignItems:'center'}}>
                <TouchableWithoutFeedback style={{height:80, width:80, backgroundColor:'#16abd5', justifyContent:'center', alignItems:'center', borderRadius:100}} onPress={()=>handlePress()}>
                    <Ionicons name="add" color={'#ffffff'} size={22}/>
                </TouchableWithoutFeedback> 
                <Text style={{fontSize:11, color:'#000000', marginTop:5}}>{name}</Text> 
            </View>
        </View>
    )
}

export default Button