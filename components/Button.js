import React from "react";
import { View, Text} from 'react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Button = ({name,handlePress})=>{
    const navigation = useNavigation()
    return(
        <TouchableWithoutFeedback style={{height:40, width:150, backgroundColor:'#16abd5', justifyContent:'center', alignItems:'center'}} onPress={()=>handlePress()}>
            <Text style={{fontSize:20, color:'#ffffff'}}>{name}</Text>
        </TouchableWithoutFeedback>  
    )
}

export default Button