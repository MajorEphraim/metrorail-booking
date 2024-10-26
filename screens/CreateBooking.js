import React,{useState} from "react";
import {View, Text, Dimensions, TextInput, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Button from "../components/Button";
import TrainSchedule from "../modals/TrainSchedule";
import addBooking from "../functions/addBooking";
import { useSelector } from "react-redux";
import Loader from "../modals/Loader";

import DateSetter from "../modals/DateSetter";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const CreateBooking = ()=>{

    //      {id:'1', date:'20 Nov', dest:'Johannesburg', platform:'3', train:'1M23', status:'Paid', time:'13:00',  travellers:1, from:'Pretoria', ticketNo:'23115',actualTime:10838388288},


    //const [date, setDate] = useState(new Date())
    const [day1, setDay1] = useState('')
    const [day2, setDay2] = useState('')
    const [mon1, setMon1] = useState('')
    const [mon2, setMon2] = useState('')
    const [year1, setYear1] = useState('')
    const [year2, setYear2] = useState('')
    const [year3, setYear3] = useState('')
    const [year4, setYear4] = useState('')
    const [travelers, setTravelers] = useState('')
    const [time, setTime] = useState(null)
    const [from, setFrom] = useState(null)
    const [dest, setDestination] = useState(null)
    const [cost, setCost] = useState(null)
    const [platform, setPlatform] = useState(null)
    const [train, setTrain] = useState(null) 
    const [isVisible, setIsVisible] = useState(false) 
    const [isLoading, setIsLoading] = useState(false) 
    const [isOpen, setIsOpen] = useState(false);

    const clientId = useSelector(state=>state.authState.userToken)


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

    const makeBooking =async ()=>{
       

        //const actualTime;
       
        setIsLoading(true)

        const day = day1 === '0' ? day2 : day1+day2
        const month = mon1 === '0' ? (parseInt(mon2)-1) : (parseInt(mon1+mon2)-1)
        const year = year1+year2+year3+year4
        const actualTime = (parseInt(year)*31536000) + (month * 2628002.88) + (parseInt(day)* 86400)
        try {
            await addBooking(handleDate(), 
                dest, 
                platform, 
                train,  
                travelers, 
                from, 
                actualTime,
                clientId)
            
                setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            alert(error.message)
        }
       

    }

    const createAlert = () =>{
        if(handleDate() === ''){
            alert("Please enter the date")
            return 
        }

        if(travelers === ''){
            alert("Number of travelers is required")
            return 
        }

        if(time ===null){
            alert("Please select your option on the schedule")
            return 
        }

    Alert.alert('Confirm price', 'The total price to be payed for the ticket is R '+parseFloat(cost)*travelers, [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Okay', onPress:makeBooking},
    ]);

}

    //157eaf   placeholder color
    return(
        <View style={{flex:1, backgroundColor:'#ffffff', flexDirection:'column', alignItems:'center',justifyContent:'space-between', padding:45}}>

        <TouchableWithoutFeedback onPress={()=>setIsVisible(true)}>
            <View style={{borderColor:'#16abd5', width:.66*width, height:45, borderWidth:1, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:0.043*width}}>View Train Schedule</Text>
            </View>
        </TouchableWithoutFeedback>
        <View style={{margin:20, width, paddingLeft:20}}>
            <View>
          
            <TouchableOpacity style={styles.textInput} onPress={()=>setIsOpen(true)}>
                {
                    handleDate() !== '' ? <Text style={styles.text}>{handleDate()}</Text>:<Text style={styles.placeholder}>Select a traveling date</Text>
                }
            </TouchableOpacity>

            <TextInput
                style={styles.textInput}
                value={travelers}
                onChangeText={val=>setTravelers(val)}
                placeholder="Number of travelers"
                placeholderTextColor={'#157eaf'}
            />

            <View style={styles.textInput}>
                {
                    time !== null ? <Text style={styles.text}>{time}</Text>:<Text style={styles.placeholder}>Time (view schedule)</Text>
                }
             </View>

             <View style={styles.textInput}>
                {
                    from !== null ? <Text style={styles.text}>{from}</Text>:<Text style={styles.placeholder}>Departure (view schedule)</Text>
                }
             </View>

              <View style={styles.textInput} >
                {
                    dest !== null ? <Text style={styles.text}>{dest}</Text>:<Text style={styles.placeholder}>Destination (view schedule)</Text>
                }
             </View>


            <View style={styles.textInput} >
                {
                    platform !== null ? <Text style={styles.text}>{platform}</Text>:<Text style={styles.placeholder}>Platform (view schedule)</Text>
                }
            </View>

            <View style={styles.textInput}>
                {
                    train !== null ? <Text style={styles.text}>{train}</Text>:<Text style={styles.placeholder}>Train (view schedule)</Text>
                }
            </View>
            </View>   
        </View>
        <TrainSchedule isVisible={isVisible} setIsVisible={setIsVisible} setTime={setTime} setDestination={setDestination} setPlatform={setPlatform} setTrain={setTrain} setFrom={setFrom} setCost={setCost}/>
        <Button name='Book' handlePress={createAlert}/>
        <Loader isVisible={isLoading}/>
        <DateSetter 
        isVisible={isOpen} setIsVisible={setIsOpen} 
        setDay1={setDay1} setDay2={setDay2} setMon1={setMon1} setMon2={setMon2} setYear1={setYear1} setYear2={setYear2} setYear3={setYear3} setYear4={setYear4} 
        day1={day1} day2={day2} mon1={mon1} mon2={mon2} year1={year1} year2={year2} year3={year3} year4={year4}
        />
    </View>
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
        color:'#ffffff',
        fontSize:17,
    },
    placeholder:{
        color:'#157eaf',
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

export default CreateBooking