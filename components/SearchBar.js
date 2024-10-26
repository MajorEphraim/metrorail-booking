import React from "react";
import { View, Text, Dimensions, TextInput} from 'react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const SearchBar = ({searched,setSearched, placeholder})=>{
    return(
        <View style={{width:'100%', flexDirection:'row', marginTop:20, marginBottom:10}}>
            <TextInput style={{height:35, width:.62*width, backgroundColor:'transparent', justifyContent:'center', alignItems:'center', borderColor:'#16abd5', borderWidth:2, borderRadius:20, padding:8}} 
            onChangeText={(val)=>setSearched(val)}
            value={searched}
            placeholder={placeholder}
            />
        </View>
    )
}

export default SearchBar