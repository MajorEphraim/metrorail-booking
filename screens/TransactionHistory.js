import React from "react";
import {View, Text, Dimensions, FlatList } from 'react-native'
import { useSelector } from "react-redux";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const TransactionHistory = ()=>{
    const transHistory = useSelector(state=>state.historyState.allHistory)
    return(
        <View style={{flex:1, backgroundColor:'#ffffff', padding:10}}>
            <View style={{backgroundColor:'#16abd5', flexDirection:'row', justifyContent:'space-evenly', marginTop:30}}>
                <Text style={{fontSize:0.037*width, color:'#ffffff'}}>Date</Text>
                <Text style={{fontSize:0.037*width, color:'#ffffff'}}># Travelers</Text>
                <Text style={{fontSize:0.037*width, color:'#ffffff'}}>Payment</Text>
                <Text style={{fontSize:0.037*width, color:'#ffffff'}}>Amount (R)</Text>
            </View>
            <FlatList
                data={transHistory}
                keyExtractor={item=>item.id}
                style={{marginVertical:6}}
                renderItem={({item})=>(
                <View style={{ flexDirection:'row', justifyContent:'space-evenly', borderBottomColor:'#000000', borderBottomWidth:1, height:30, alignItems:'center'}}>
                    <Text style={{fontSize:0.037*width, color:'#000000', flex:1}}>{item.date}</Text>
                    <Text style={{fontSize:0.037*width, color:'#000000',flex:1}}>{item.travelers}</Text>
                    <Text style={{fontSize:0.037*width, color:'#000000',flex:1}}>{item.payment}</Text>
                    <Text style={{fontSize:0.037*width, color:'#000000',flex:1}}>{item.amount.toFixed(2)}</Text>
                </View>
                )}
            />

        </View>
    )
}

export default TransactionHistory