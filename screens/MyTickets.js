import React from "react";
import {View, Text, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native'
import { useSelector } from "react-redux";
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

// const data = [
//     {id:'1', date:'20 Nov', dest:'Johannesburg', platform:'3', train:'1M23', status:'Valid', time:'13:00',  travellers:1, from:'Pretoria', ticketNo:'23115'},
//     {id:'2', date:'11 Mar', dest:'Alberton', platform:'1', train:'1M08', status:'Invalid (used)', time:'09:00', travellers:2, from:'South Gate', ticketNo:'10882'},
//     {id:'3', date:'20 Nov', dest:'George', platform:'2', train:'2M01', status:'Valid', time:'13:00',  travellers:5, from:'Pretoria', ticketNo:'23115'},
//     {id:'4', date:'11 Mar', dest:'Orlando', platform:'4', train:'2M11', status:'Invalid (used)', time:'09:00', travellers:3, from:'South Gate', ticketNo:'10882'},
// ]

// {id:'1', date:'20 Nov', dest:'Johannesburg', platform:'3', train:'1M23', status:'Paid'},
let d = new Date()
let time = d.getTime();

const MyTickets = ()=>{
    const accountDetails = useSelector(state=>state.accountState)
    const data = useSelector(state=>state.bookingsState.allBookings)
    const paidTickets = data.filter(item=>item.status === 'Paid')
    return(
        <View style={{flex:1, backgroundColor:'#ffffff', paddingHorizontal:25, paddingVertical:12}}>
            <View style={{marginBottom:5, marginLeft:10}}>
                <Text style={{fontSize:0.038*width, color:'#000000', }}>Total tickets: {paidTickets.length}</Text>
                <Text style={{fontSize:0.036*width, color:'#000000', fontStyle:'italic'}}>You can screenshot (optional)</Text>
            </View>
            <FlatList
                data={paidTickets}
                keyExtractor={item=>item.id}
                style={{marginVertical:6}}
                renderItem={({item})=>(
                <View style={{ flexDirection:'column', height:.67*height, alignItems:'center', backgroundColor:'#e5e3e3', marginBottom:20, borderRadius:30, padding:20}}>
                <Text style={{fontSize:0.049*width,fontWeight:'bold', color:'#000000', marginBottom:5}}>Metrorail ticket</Text>
                <View style={{flexDirection:'row',}}>
                    <View style={{height:'100%',flex:1, flexDirection:'column', alignItems:'flex-start', justifyContent:'space-evenly'}}>
                        <View> 
                            <Text style={{fontSize:0.038*width, color:'#000000'}}>Ticket parchaser</Text>
                            <Text style={{fontSize:0.047*width, fontWeight:'bold' ,color:'#000000'}}>{accountDetails.firstName}</Text>
                        </View>

                        <View>
                            <Text style={{fontSize:0.038*width, color:'#000000'}}>From</Text>
                            <Text style={{fontSize:0.047*width, fontWeight:'bold' ,color:'#000000'}}>{item.from}</Text>
                        </View>

                        <View> 
                            <Text style={{fontSize:0.037*width, color:'#000000'}}>Date</Text>
                            <Text style={{fontSize:0.047*width, fontWeight:'bold' ,color:'#000000'}}>{item.date}</Text>
                        </View>

                        <View>
                            <Text style={{fontSize:0.038*width, color:'#000000'}}>Train</Text>
                            <Text style={{fontSize:0.041*width, fontWeight:'bold' ,color:'#000000'}}>{item.train}</Text>
                        </View>

                        <View>
                            <Text style={{fontSize:0.038*width, color:'#000000'}}>Status</Text>
                            <Text style={{fontSize:0.047*width, fontWeight:'bold' ,color: item.actualTime <= time ? 'green':'red'}}>{item.actualTime <= time ? 'Valid':'Invalid (used)'}</Text>
                        </View>
                    </View>

                    <View style={{height:'100%', flex:1, flexDirection:'column', alignItems:'flex-end'}}>
                        <View style={{height:'100%', justifyContent:'space-evenly'}}>
                            <View>
                                <Text style={{fontSize:0.038*width, color:'#000000'}}>Passenger #</Text>
                                <Text style={{fontSize:0.047*width, fontWeight:'bold' ,color:'#000000'}}>{item.travelers}</Text>
                            </View>


                            <View>
                                <Text style={{fontSize:0.038*width, color:'#000000'}}>To</Text>
                                <Text style={{fontSize:0.047*width, fontWeight:'bold' ,color:'#000000'}}>{item.dest}</Text>
                            </View>

                            <View> 
                                <Text style={{fontSize:0.038*width, color:'#000000'}}>Time</Text>
                                <Text style={{fontSize:0.047*width, fontWeight:'bold' ,color:'#000000'}}>{item.time}</Text>
                            </View>

                            <View>
                                <Text style={{fontSize:0.038*width, color:'#000000'}}>Platform</Text>
                                <Text style={{fontSize:0.047*width, fontWeight:'bold' ,color:'#000000'}}>{item.platform}</Text>
                            </View>

                            <View>
                                <Text style={{fontSize:0.038*width, color:'#000000'}}>Ticket #</Text>
                                <Text style={{fontSize:0.047*width, fontWeight:'bold' ,color:'#16abd5'}}>{item.ticketNo}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                    {/* <View style={{height:'80%',flexDirection:'column', justifyContent:'space-between', flex:1}}>
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
                            <Text style={{fontSize:0.041*width, fontWeight:'bold', color:item.status === 'Paid' ?'green':'orange'}}>{item.status}</Text>
                        </View>

                        <View>
                            <Text style={{fontSize:0.037*width, color:'#000000'}}>{item.train}</Text>
                            <Text style={{fontSize:0.041*width, fontWeight:'bold',color:'#000000'}}>Platform {item.platform}</Text>
                        </View>
                    </View> */}
                </View>
                )}
            />
            
        </View>
    )
}

export default MyTickets