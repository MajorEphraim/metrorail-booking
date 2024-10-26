import React from "react";
import { View, Text, Dimensions} from 'react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const AuthButton = ({name,handlePress})=>{
    const navigation = useNavigation()
    return(
        <TouchableWithoutFeedback style={{height:40, width:.7*width, backgroundColor:'transparent', justifyContent:'center', alignItems:'center', borderColor:'#16abd5', borderWidth:2, borderRadius:20}} onPress={()=>handlePress()}>
            <Text style={{fontSize:.03*width, color:'lightgrey', fontWeight:'bold'}}>{name}</Text>
        </TouchableWithoutFeedback>  
    )
}

export default AuthButton