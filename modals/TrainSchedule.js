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

const TrainSchedule = ({isVisible,setIsVisible,setTime,setDestination, setPlatform, setTrain, setFrom, setCost})=>{

    const schedule = useSelector(state=>state.scheduleState.allSchedule)
    const [searched, setSearched] = useState('')

      const selectSchedule = (item)=>{
        setTime(item.time)
        setDestination(item.dest)
        setPlatform(item.platform)
        setTrain(item.train)
        setFrom(item.depart)
        setIsVisible(false)
        setCost(item.cost)
      }


    const createAlert = (item) =>
    Alert.alert('Confirm selection', 'The price to be payed for each passenger is R'+item.cost, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Confirm', onPress: ()=>selectSchedule(item)},
    ]);

      const searchedData = schedule.filter(item=>item.dest.toLowerCase().indexOf(searched.toLowerCase()) !== -1 || item.depart.toLowerCase().indexOf(searched.toLowerCase()) !== -1)
    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', flexDirection:'column', justifyContent:'flex-end'}}>
                <View style={{ backgroundColor:'#ffffff', height:.85*height, width, borderTopEndRadius:25, borderTopStartRadius:25, padding:15}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:0.041*width, fontWeight:'bold', }}>Train schedule</Text>
                        <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                            <Text style={{fontSize:0.035*width, fontWeight:'500'}}>Close</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{flex:1,marginTop:20, justifyContent:'space-between', paddingBottom:30}}>
                    <SearchBar searched={searched} setSearched={setSearched} placeholder='...search schedule'/>
                        <View style={{flexDirection:'row', justifyContent:'space-evenly', marginTop:30, paddingHorizontal:5}}>
                            <Text style={{fontSize:0.037*width, fontWeight:'bold', color:'#000000', marginRight:10}}>Time</Text>
                            <Text style={{fontSize:0.037*width, fontWeight:'bold',color:'#000000', flex:10}}>Departure</Text>
                            <Text style={{fontSize:0.037*width, fontWeight:'bold',color:'#000000', flex:10}}>Destination</Text>
                            <Text style={{fontSize:0.037*width, fontWeight:'bold',color:'#000000', flex:6, marginLeft:2}}>Platform</Text>
                            <Text style={{fontSize:0.037*width, fontWeight:'bold',color:'#000000', flex:4,marginLeft:10}}>Train</Text>
                        </View>
                        <FlatList
                            data={searchedData}
                            keyExtractor={item=>item.id}
                            style={{marginVertical:6, height:0.5*height}}
                            renderItem={({item})=>(
                                <TouchableOpacity onPress={()=>createAlert(item)} style={{ flexDirection:'row', justifyContent:'space-evenly', backgroundColor:'#16abd5', marginBottom:5, height:30, alignItems:'center', paddingHorizontal:5}}>
                                    <Text style={{fontSize:0.037*width, color:'#ffffff', marginRight:10}}>{item.time}</Text>
                                    <Text style={{fontSize:0.037*width, color:'#ffffff',flex:10}}>{item.depart}</Text>
                                    <Text style={{fontSize:0.037*width, color:'#ffffff',flex:10}}>{item.dest}</Text>
                                    <Text style={{fontSize:0.037*width, color:'#ffffff',flex:6, marginLeft:2}}>     {item.platform}</Text>
                                    <Text style={{fontSize:0.037*width, color:'#ffffff',flex:4, marginLeft:10}}>{item.train}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    <View style={{width:'100%', alignItems:'center'}}>
                        <Text style={{fontSize:0.037*width, color:'#000000', fontWeight:'500'}}>Select the schedule you want to book for</Text>
                        <Text style={{fontSize:0.034*width, color:'#000000', marginTop:10, fontStyle:'italic'}}>Note that this a schedule for the date you selected</Text>
                    </View>
                    </View>
                </View>
            </View>  
        </Modal>
    )
}

export default TrainSchedule
