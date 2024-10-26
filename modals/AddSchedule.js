import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform,
        TouchableWithoutFeedback, FlatList,
        TextInput, StyleSheet
    } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import addSchedule from '../functions/addSchedule'
import Loader from '../modals/Loader'
import DateSetter from './DateSetter'
import TimeSetter from './TimeSetter'
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const AddSchedule = ({isVisible,setIsVisible})=>{

    //const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [from, setFrom] = useState(null)
    const [dest, setDestination] = useState(null)
    const [cost, setCost] = useState(null)
    const [platform, setPlatform] = useState(null)
    const [train, setTrain] = useState(null) 

    const [isLoading, setIsLoading] = useState(false) 
    const [isOpen, setIsOpen] = useState(false) 
    const [isOpen2, setIsOpen2] = useState(false)

    const [day1, setDay1] = useState('')
    const [day2, setDay2] = useState('')
    const [mon1, setMon1] = useState('')
    const [mon2, setMon2] = useState('')
    const [year1, setYear1] = useState('')
    const [year2, setYear2] = useState('')
    const [year3, setYear3] = useState('')
    const [year4, setYear4] = useState('')

    const [min1, setMin1] = useState('')
    const [min2, setMin2] = useState('')
    const [hour1, setHour1] = useState('')
    const [hour2, setHour2] = useState('')


    const handleDate =()=>{
        
        if(day1 === ''){
            return ''
        }
        const day = day1 === '0' ? day2 : day1+day2
        const month = mon1 === '0' ? (parseInt(mon2)-1) : (parseInt(mon1+mon2)-1)
        const year = year1+year2+year3+year4
    
        const date = day+" "+months[month]+" "+year
        
        return date
    }

    const handleTime =()=>{
        
        if(min1 === ''){
            return ''
        }

        
        return min1+min2+":"+hour1+hour2
    }

      const handleAddSchedule = async()=>{
        if(handleDate() === ''){
            alert("Date is required")
            return
        }

        if(handleTime() === ''){
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
                await addSchedule(handleDate(), 
                handleTime(), 
                    platform, 
                    train,  
                    from, 
                    dest,
                    parseFloat(cost))
                    setIsLoading(false)
                    setIsVisible(false)
            } catch (error) {
                setIsLoading(false)
                alert(error.message)
            }
      }

    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', flexDirection:'column', justifyContent:'flex-end'}}>
                <View style={{ backgroundColor:'#ffffff', height:.85*height, width, borderTopEndRadius:25, borderTopStartRadius:25, padding:15}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:0.041*width, fontWeight:'bold', }}>Add schedule</Text>
                        <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                            <Text style={{fontSize:0.035*width, fontWeight:'500'}}>Close</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{marginTop:.09*height, height:'100%', alignItems:'center', }}>
            
            <View style={{marginBottom:.09*height}}>
            <TouchableOpacity style={styles.textInput} onPress={()=>setIsOpen(true)}>
                {
                    handleDate() !== '' ? <Text style={{color:'#ffffff',fontSize:17,}}>{handleDate()}</Text>:<Text style={{color:'#ffffff',fontSize:17,}}>Enter date</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity style={styles.textInput} onPress={()=>setIsOpen2(true)}>
                {
                    handleTime() !== '' ? <Text style={{color:'#ffffff',fontSize:17,}}>{handleTime()}</Text>:<Text style={{color:'#ffffff',fontSize:17,}}>Enter time</Text>
                }
            </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    value={from}
                    onChangeText={(val)=>setFrom(val)}
                    placeholderTextColor={'#157eaf'}
                    placeholder="Departure"
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
                value={cost}
                onChangeText={(val)=>setCost(val)}
                placeholderTextColor={'#157eaf'}
                placeholder="Amount"
                keyboardType='numeric'
                />
        </View>
                <TouchableWithoutFeedback onPress={handleAddSchedule}>
                    <View style={{height:40, width:150, backgroundColor:'#16abd5', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:20, color:'#ffffff'}}>{'Add'}</Text>
                    </View>  
                </TouchableWithoutFeedback>
                <Loader isVisible={isLoading}/>
                <DateSetter 
                    isVisible={isOpen} setIsVisible={setIsOpen} 
                    setDay1={setDay1} setDay2={setDay2} setMon1={setMon1} setMon2={setMon2} setYear1={setYear1} setYear2={setYear2} setYear3={setYear3} setYear4={setYear4} 
                    day1={day1} day2={day2} mon1={mon1} mon2={mon2} year1={year1} year2={year2} year3={year3} year4={year4}
                    />

                <TimeSetter 
                    isVisible={isOpen2} setIsVisible={setIsOpen2} 
                    setDay1={setMin1} setDay2={setMin2} setMon1={setHour1} setMon2={setHour2}  
                    day1={min1} day2={min2} mon1={hour1} mon2={hour2} 
                />
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


export default AddSchedule
