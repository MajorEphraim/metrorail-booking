import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform,
        TouchableWithoutFeedback, FlatList,
        TextInput, StyleSheet
    } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import Loader from '../modals/Loader'
import addHistory from '../functions/addTransHistory'
import ChoosePayer from './ChoosePayer'
import ChooseMethod from './ChooseMethod'
import DateSetter from './DateSetter'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const AddHistory = ({isVisible,setIsVisible})=>{

    ///const [date, setDate] = useState('')
    const [travelers, setTravelers] = useState('')
    const [amount, setAmount] = useState('')
    const [payment, setPayment] = useState('Choose payment method')
    const [payer, setPayer] = useState({firstName:'Choose payer'})

    const [day1, setDay1] = useState('')
    const [day2, setDay2] = useState('')
    const [mon1, setMon1] = useState('')
    const [mon2, setMon2] = useState('')
    const [year1, setYear1] = useState('')
    const [year2, setYear2] = useState('')
    const [year3, setYear3] = useState('')
    const [year4, setYear4] = useState('')
    //const [method, setMethod] = useState('Deposit')

    const [isLoading, setIsLoading] = useState(false)

    const [isShown, setIsShown] = useState(false)
    const [isShown2, setIsShown2] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

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

    const handleAddHistory=async()=>{

        // if(userId === ''){
        //     alert("The amount payer is required")
        //     return
        // }

        if(handleDate() === ''){
            alert("Date is required")
            return
        }

        if(travelers === ''){
            alert("Number of travelers is required")
            return
        }

        if(amount === ''){
            alert("Amount paid is required")
            return
        }

        if(payment === 'Choose payment method'){
            alert("Payment method is required")
            return
        }

        if(payer.firstName === 'Choose payer'){
            alert("The name of the payer is required")
            return
        }

        setIsLoading(true)
        try {
            await addHistory(handleDate(), 
                travelers, 
                payment, 
                parseFloat(amount),
                payer.clientId
                )
            setIsLoading(false)
            setIsVisible(false)
        } catch (error) {
            alert(error.message)
            setIsLoading(false)
            setIsVisible(false)
        }
    }
    
    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', flexDirection:'column', justifyContent:'flex-end'}}>
                <View style={{ backgroundColor:'#ffffff', height:.85*height, width, borderTopEndRadius:25, borderTopStartRadius:25, padding:15}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:0.041*width, fontWeight:'bold', }}>Add transaction history</Text>
                        <TouchableWithoutFeedback onPress={()=>setIsVisible(false)}>
                            <Text style={{fontSize:0.035*width, fontWeight:'500'}}>Close</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{marginTop:.09*height, height:'100%', alignItems:'center', }}>
            
            <View style={{marginBottom:.15*height}}>
                {/* <TextInput
                    style={styles.textInput}
                    value={date}
                    onChangeText={val=>setDate(val)}
                    placeholder="Date of payment"
                    placeholderTextColor={'lightgrey'}
                /> */}

                  <TouchableOpacity style={styles.textInput} onPress={()=>setIsOpen(true)}>
                {
                    handleDate() !== '' ? <Text style={{color:'#ffffff',fontSize:17,}}>{handleDate()}</Text>:<Text style={{color:'#ffffff',fontSize:17,}}>Enter a payment date</Text>
                }
            </TouchableOpacity>

                <TextInput
                    style={styles.textInput}
                    value={travelers}
                    onChangeText={val=>setTravelers(val)}
                    placeholder="Number of travelers"
                    placeholderTextColor={'#157eaf'}
                />

                {/* <TextInput
                style={styles.textInput}
                value={payment}
                onChangeText={(val)=>setPayment(val)}
                placeholderTextColor={'#157eaf'}
                placeholder="Payment method"
                /> */}

                <TouchableOpacity onPress={()=>setIsShown2(true)} style={styles.textInput}>
                    <Text style={{color:'#ffffff',fontSize:17,}}>{payment}</Text>
                </TouchableOpacity>

                <TextInput
                style={styles.textInput}
                value={amount}
                onChangeText={(val)=>setAmount(val)}
                placeholderTextColor={'#157eaf'}
                placeholder="Amount paid"
                />

                <TouchableOpacity onPress={()=>setIsShown(true)} style={styles.textInput}>
                    <Text style={{color:'#ffffff',fontSize:17,}}>{payer.firstName}</Text>
                </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={handleAddHistory}>
                    <View style={{height:40, width:150, backgroundColor:'#16abd5', justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:20, color:'#ffffff'}}>{'Add'}</Text>
                    </View>  
                </TouchableWithoutFeedback>
                <Loader isVisible={isLoading}/>
                <ChoosePayer isVisible={isShown} setIsVisible={setIsShown} setPayer={setPayer}/>
                <ChooseMethod isVisible={isShown2} setIsVisible={setIsShown2} setMethod={setPayment}/>
                <DateSetter 
                    isVisible={isOpen} setIsVisible={setIsOpen} 
                    setDay1={setDay1} setDay2={setDay2} setMon1={setMon1} setMon2={setMon2} setYear1={setYear1} setYear2={setYear2} setYear3={setYear3} setYear4={setYear4} 
                    day1={day1} day2={day2} mon1={mon1} mon2={mon2} year1={year1} year2={year2} year3={year3} year4={year4}
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


export default AddHistory
