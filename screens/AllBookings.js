import React from "react";
import {View, Text, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import deleteBooking from "../functions/deleteBooking";
import { useSelector } from "react-redux";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const AllBookings = ()=>{

    const data = useSelector(state=>state.bookingsState.allBookings)

    const confirmDelete= async(id) =>{
        try {
            
            await deleteBooking(id)
        } catch (error) {
            alert(error.message)
        }
    }
    
    const createAlert = (id) =>
    Alert.alert('Confirm cancelation', 'Are you sure you want to cancel this booking? Remember, this action cannot be reversed', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Confirm', onPress: ()=>confirmDelete(id)},
    ]);

    return(
        <View style={{flex:1, backgroundColor:'#ffffff', paddingVertical:15}}>

            <FlatList
                data={data}
                keyExtractor={item=>item.id}
                style={{marginVertical:6}}
                renderItem={({item})=>(
                <View style={{ flexDirection:'row', justifyContent:'space-between', height:150, alignItems:'center', backgroundColor:'#e5e3e3', marginBottom:20,marginHorizontal:10, borderRadius:30, padding:13}}>
                   
                    <View style={{height:'80%',flexDirection:'column', justifyContent:'space-between', flex:1}}>
                        <View>
                            <Text style={{fontSize:0.037*width, color:'#000000'}}>Date</Text>
                            <Text style={{fontSize:0.041*width, fontWeight:'bold' ,color:'#000000'}}>{item.date}</Text>
                        </View>

                        <View>
                            <Text style={{fontSize:0.037*width, color:'#000000'}}>To</Text>
                            <Text style={{fontSize:0.041*width, fontWeight:'bold',color:'#000000'}}>{item.dest}</Text>
                        </View>
                    </View>

                    <View style={{height:'80%',flexDirection:'column', justifyContent:'space-between', flex:1}}>
                        <View>
                            <Text style={{fontSize:0.037*width, color:'#000000'}}>Status</Text>
                            <Text style={{fontSize:0.041*width, fontWeight:'bold', color:item.status === 'Paid' ?'#1d9f30':'#e86d31'}}>{item.status}</Text>
                        </View>

                        <View>
                            <Text style={{fontSize:0.037*width, color:'#000000'}}>{item.train}</Text>
                            <Text style={{fontSize:0.041*width, fontWeight:'bold',color:'#000000'}}>Platform {item.platform}</Text>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity onPress={()=>createAlert(item.id)} style={{height:'100%', flexDirection:'column', alignItems:'center'}}>
                        <MaterialIcons name="cancel" color={'#ca1616'} size={22}/>
                            <Text style={{fontSize:0.037*width, color:'#ca1616'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )}
            />
            
        </View>
    )
}

export default AllBookings