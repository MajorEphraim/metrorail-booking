import React,{useState} from "react";
import {View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { useSelector } from "react-redux";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AddButton from '../components/AddButton'
import AddHistory from "../modals/AddTransHistory";

import deleteHistory from "../functions/deleteHistrory";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const TransactionHistory = ()=>{
    const transHistory = useSelector(state=>state.historyState.allHistory)
    const [isVisible, setIsVisible] = useState(false)
    return(
        <View style={{flex:1, backgroundColor:'#ffffff', padding:10}}>
            <View style={{backgroundColor:'#16abd5', flexDirection:'row', justifyContent:'space-evenly', marginTop:30}}>
                <Text style={{fontSize:0.037*width, color:'#ffffff', flex:2}}>Date</Text>
                <Text style={{fontSize:0.037*width, color:'#ffffff', flex:2}}># Travelers</Text>
                <Text style={{fontSize:0.037*width, color:'#ffffff', flex:2}}>Payment</Text>
                <Text style={{fontSize:0.037*width, color:'#ffffff', flex:2}}>Amount (R)</Text>
                <View style={{backgroundColor:'#ffffff',flex:1}}/>
            </View>
            <FlatList
                data={transHistory}
                keyExtractor={item=>item.id}
                style={{marginVeratical:6}}
                renderItem={({item})=>(
                  
                <View style={{ flexDirection:'row', justifyContent:'space-evenly', borderBottomColor:'#000000', borderBottomWidth:1, height:30, alignItems:'center', marginTop:10}}>
                    <Text style={{fontSize:0.037*width, color:'#000000', flex:2,  }}>{item.date}</Text>
                    <Text style={{fontSize:0.037*width, color:'#000000',flex:2,}}>       {item.travelers}</Text>
                    <Text style={{fontSize:0.037*width, color:'#000000',flex:2}}>{item.payment}</Text>
                    <Text style={{fontSize:0.037*width, color:'#000000',flex:2}}>{item.amount.toFixed(2)}</Text>
                    <TouchableOpacity onPress={()=>deleteHistory(item.id)} activeOpacity={1}  style={{flex:1, height:31, justifyContent:'center', alignItems:'center', backgroundColor:'#ffffff'}}>
                        <MaterialIcons name="cancel" color={'#000000'} size={22}/>
                    </TouchableOpacity>
                </View>
            
                )}
            />

            <AddButton name='Add transaction' handlePress={()=>setIsVisible(true)}/>
            <AddHistory isVisible={isVisible} setIsVisible={setIsVisible} />

        </View>
    )
}

export default TransactionHistory