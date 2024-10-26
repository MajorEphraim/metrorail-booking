import React from "react";
import { View, Text} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Header = ()=>{
    const navigation = useNavigation()
    const accountDetails = useSelector(state=>state.accountState)
    return(
        <View style={{width:'100%', height:65, marginTop:20,flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingRight:12,  paddingLeft:7}}>
            <TouchableWithoutFeedback onPress={()=>navigation.openDrawer()}>
                <Ionicons name="menu" color={'#16abd5'} size={40} />
            </TouchableWithoutFeedback>
            {
                accountDetails.role === 'Normal'?(
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Make booking')}>
                        <View style={{height:30, width:30, backgroundColor:'#2e3233', borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                            <Ionicons name="add" color={'#ffffff'} size={22}/>
                        </View>
                    </TouchableWithoutFeedback>

                ):(
                    null
                )
            }
        </View>
    )
}

export default Header