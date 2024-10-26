import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform,
        TouchableWithoutFeedback, FlatList, 
        Alert
    } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const ChoosePayer = ({isVisible,setIsVisible,setPayer})=>{

    const bookings = useSelector(state=>state.bookingsState.allBookings)
    const bookedClients =bookings.filter(item=>item.status ==='Paid').map(item=>item.clientId)
    const clients = useSelector(state=>state.usersState.allUsers)
    
    const data = clients.filter(item=>bookedClients.includes(item.clientId))
     
    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', flexDirection:'column'}}>
                <View style={{ backgroundColor:'#ffffff', height:.45*height, width:.4*width,borderRadius:25, padding:15, alignItems:'center'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontSize:0.041*width, fontWeight:'bold', }}>Choose Payer</Text>
                        {/* <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                            <Text style={{fontSize:0.035*width, fontWeight:'500'}}>Close</Text>
                        </TouchableWithoutFeedback> */}
                    </View>
                    <View style={{flex:1,marginTop:20, justifyContent:'space-between', paddingBottom:5}}>
                        {
                            data.length >0 ?(
                                <FlatList
                                data={data}
                                keyExtractor={item=>item.id}
                                style={{marginVertical:6, height:0.5*height}}
                                renderItem={({item})=>(
                                    <TouchableOpacity onPress={()=>{setPayer(item), setIsVisible(false)}} style={{width:'100%', flexDirection:'row', justifyContent:'space-evenly', backgroundColor:'#16abd5',alignItems:'center', marginBottom:5, height:30, paddingHorizontal:5}}>
                                        <Text style={{fontSize:0.037*width, color:'#ffffff', marginRight:10}}>{item.firstName} {item.lastName}</Text>
    
                                    </TouchableOpacity>
                                )}
                            />
                            ):(
                                <TouchableOpacity onPress={()=>{setIsVisible(false)}} style={{width:'100%', flexDirection:'row', justifyContent:'space-evenly', backgroundColor:'#16abd5',alignItems:'center', marginBottom:5, height:30, paddingHorizontal:5}}>
                                <Text style={{fontSize:0.037*width, color:'#ffffff', marginRight:10}}>CLOSE</Text>

                            </TouchableOpacity>
                            )
                        }
                     
                    </View>
                </View>
            </View>  
        </Modal>
    )
}

export default ChoosePayer
