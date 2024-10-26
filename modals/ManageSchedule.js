import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform,
        TouchableWithoutFeedback, FlatList,
        TextInput, StyleSheet
    } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '../components/Button';
import Loader from './Loader';
import removeSchedule from '../functions/removeSchedule'
import updateSchedule from '../functions/updateSchedule';
import fetchSchedule from '../functions/fetchSchedule';

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const UpdateSchedule = ({isVisible,setIsVisible,scheduleId, date, time, from, dest, cost, platform, train, setTime,setDestination, setPlatform, setTrain, setFrom, setCost})=>{

      const [isLoading, setIsLoading] = useState(false)

      const handleUpdateSchedule = async()=>{

        if(date === null){
            alert("Date is required")
            return
        }

        if(time === null){
            alert("Time is required")
            return
        }

        if(from === null){
            alert("Departure is required")
            return
        }

        if(dest === null){
            alert("Destination is required")
            return
        }

        if(cost === null){
            alert("Cost is required")
            return
        }

        if(platform === null){
            alert("platform is required")
            return
        }

        if(train === null){
            alert("Train field is required")
            return
        }

        setIsLoading(true)
        try {
        
            await updateSchedule(scheduleId, {date, time, depart:from, dest, cost:parseFloat(cost), platform, train})
            //await fetchSchedule()
            setIsLoading(false)
            setIsVisible(false)
           } catch (error) {
            alert(error.message)
            setIsLoading(false)
           }

      }

      const deleteSchedule = async()=>{
        setIsLoading(true)
       try {
        await removeSchedule(scheduleId)
        setIsLoading(false)
        setIsVisible(false)
       } catch (error) {
        alert(error.message)
        setIsLoading(false)
       }
      }

    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', flexDirection:'column', justifyContent:'flex-end'}}>
            <View style={{ backgroundColor:'#ffffff', height:.85*height, width, borderTopEndRadius:25, borderTopStartRadius:25, padding:15}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:0.041*width, fontWeight:'bold', }}>Update / Delete schedule</Text>
                    <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                        <Text style={{fontSize:0.035*width, fontWeight:'500'}}>Close</Text>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{marginTop:.065*height, height:'100%', alignItems:'center'}}>
        
        <View style={{marginBottom:.07*height}}>
            <TextInput
                style={styles.textInput}
                value={date}
                onChangeText={val=>setDate(val)}
                placeholder="Date"
                placeholderTextColor={'#157eaf'}
            />

            <TextInput
                style={styles.textInput}
                value={time}
                onChangeText={val=>setTime(val)}
                placeholder="Time"
                placeholderTextColor={'#157eaf'}
            />

            <TextInput
                style={styles.textInput}
                value={from}
                onChangeText={(val)=>setFrom(val)}
                placeholderTextColor={'#157eaf'}
                placeholder="Departure"
            />

            <TextInput
                style={styles.textInput}
                value={dest}
                onChangeText={(val)=>setDestination(val)}
                placeholderTextColor={'#157eaf'}
                placeholder="Destination"
            />

            <TextInput
            style={styles.textInput}
            value={platform}
            onChangeText={(val)=>setPlatform(val)}
            placeholderTextColor={'#157eaf'}
            placeholder="Platform"
            keyboardType='number-pad'
            />

            <TextInput
            style={styles.textInput}
            value={train}
            onChangeText={(val)=>setTrain(val)}
            placeholderTextColor={'#157eaf'}
            placeholder="Train name"
            />


            <TextInput
            style={styles.textInput}
            value={cost}
            onChangeText={(val)=>setCost(val)}
            placeholderTextColor={'#157eaf'}
            placeholder="Amount"
            keyboardType='decimal-pad'
            />
    </View>
        <TouchableWithoutFeedback onPress={handleUpdateSchedule}>
                    <View style={{height:40, width:150, backgroundColor:'#16abd5', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:20, color:'#ffffff'}}>{'Update'}</Text>
                    </View>  
                </TouchableWithoutFeedback>
                <Loader isVisible={isLoading}/>

    <TouchableOpacity style={{marginTop:20}} onPress={deleteSchedule}>
        <MaterialIcons name='delete' color={'#000000'} size={40}/>
    </TouchableOpacity>
    </View>
               
            </View>
        </View>  
    </Modal>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor:'#16abd5',
        width:0.65*width,
        height:41,
        padding:0,
        borderRadius:15,
        color:'#ffffff',
        margin:7,
        fontSize:17,
        paddingLeft:7, 
        justifyContent:'center',
    },
    text:{
        color:'#000000',
        fontSize:17,
    },
    placeholder:{
        color:'lightgrey',
        fontSize:17,
    },
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
  });


export default UpdateSchedule
