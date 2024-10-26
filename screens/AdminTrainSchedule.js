import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform,
        TouchableWithoutFeedback, FlatList
    } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '../components/AddButton'
import UpdateSchedule from '../modals/ManageSchedule'
import AddSchedule from '../modals/AddSchedule'
import SearchBar from '../components/SearchBar'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const TrainSchedule = ()=>{

    const schedule = useSelector(state=>state.scheduleState.allSchedule)
    const [scheduleId, setScheduleId] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const [date, setDate] = useState(null)
    const [travelers, setTravelers] = useState(null)
    const [time, setTime] = useState(null)
    const [from, setFrom] = useState(null)
    const [dest, setDestination] = useState(null)
    const [platform, setPlatform] = useState(null)
    const [train, setTrain] = useState(null) 
    const [cost, setCost] = useState(null)

    const [searched, setSearched] = useState('')
    
      const selectSchedule = (item)=>{

        setScheduleId(item.id)
        setDate(item.date)
        setTravelers(item.travelers)
        setTime(item.time)
        setFrom(item.depart)
        setDestination(item.dest)
        setPlatform(item.platform)
        setTrain(item.train)
        setCost(item.cost.toFixed(2)+"")
        setIsVisible(true)
      }

      const searchedData = schedule.filter(item=>item.dest.toLowerCase().indexOf(searched.toLowerCase()) !== -1 || item.depart.toLowerCase().indexOf(searched.toLowerCase()) !== -1)

    return(
        // <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
           
                <View style={{ flex:1, backgroundColor:'#ffffff', height:.85*height, width, borderTopEndRadius:25, borderTopStartRadius:25, padding:15, justifyContent:'space-between'}}>
                    <SearchBar searched={searched} setSearched={setSearched} placeholder='...search schedule'/>
                    <View style={{flex:1,marginTop:20, justifyContent:'space-between', paddingBottom:30}}>
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
                                <TouchableOpacity onPress={()=>selectSchedule(item)} style={{ flexDirection:'row', justifyContent:'space-evenly', backgroundColor:'#16abd5', marginBottom:5, height:30, alignItems:'center', paddingHorizontal:5}}>
                                    <Text style={{fontSize:0.037*width, color:'#ffffff', marginRight:10}}>{item.time}</Text>
                                    <Text style={{fontSize:0.037*width, color:'#ffffff',flex:10}}>{item.depart}</Text>
                                    <Text style={{fontSize:0.037*width, color:'#ffffff',flex:10}}>{item.dest}</Text>
                                    <Text style={{fontSize:0.037*width, color:'#ffffff',flex:6, marginLeft:2}}>     {item.platform}</Text>
                                    <Text style={{fontSize:0.037*width, color:'#ffffff',flex:4, marginLeft:10}}>{item.train}</Text>
                                </TouchableOpacity>
                            )}
                        />
                  
                    </View>

                    <AddButton name={'Add schedule'} handlePress={()=>setIsOpen(true)}/>
                    <UpdateSchedule isVisible={isVisible} setIsVisible={setIsVisible} scheduleId={scheduleId} date={date} travelers={travelers} time={time} from={from} dest={dest} platform={platform} train={train} cost={cost} setTime={setTime} setDestination={setDestination} setPlatform={setPlatform} setTrain={setTrain} setFrom={setFrom} setCost={setCost}/>
                    <AddSchedule isVisible={isOpen} setIsVisible={setIsOpen} />
                </View>
    )
}

export default TrainSchedule
