import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform,
        TouchableWithoutFeedback, FlatList, 
        Alert, TextInput
    } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const TimeSetter = ({
    isVisible,setIsVisible,
    setDay1,setDay2,setMon1,setMon2,
    day1,day2,mon1,mon2
})=>{
      const done =()=>{
        if(day1 === '' || day2 === '' || mon1 === '' || mon2 === ''){
            alert("Put the correct Time format")
            return
        }
            setIsVisible(false)
      }

    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', flexDirection:'column'}}>
                <View style={{ backgroundColor:'#ffffff', height:.24*height, width:.9*width,borderRadius:25, padding:15, alignItems:'center'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontSize:0.041*width, fontWeight:'bold', }}>Enter time</Text>
                    </View>
                    <View style={{flex:1,marginTop:20, justifyContent:'space-between', paddingBottom:5}}>
                      
                                {/* <FlatList
                                data={data}
                                keyExtractor={item=>item}
                                style={{marginVertical:6, height:0.5*height}}
                                renderItem={({item})=>(
                                    <TouchableOpacity onPress={()=>{setMethod(item), setIsVisible(false)}} style={{width:'100%', flexDirection:'row', justifyContent:'space-evenly', backgroundColor:'#16abd5',alignItems:'center', marginBottom:5, height:30, paddingHorizontal:5}}>
                                        <Text style={{fontSize:0.037*width, color:'#ffffff', marginRight:10}}>{item}</Text>
    
                                    </TouchableOpacity>
                                )}
                            /> */}
                            <View style={{flexDirection:'row', alignItems:'center'}}>

                              <TextInput style={{ borderColor:'#16abd5', borderWidth:1 ,width:30, height:30, borderRadius:5, alignItems:'center', justifyContent:'center', paddingHorizontal:7, fontSize:20, margin:3 }} keyboardType='number-pad' maxLength={1} value={mon1} onChangeText={val=>setMon1(val)}/>
                            <TextInput style={{ borderColor:'#16abd5', borderWidth:1 ,width:30, height:30, borderRadius:5, alignItems:'center', justifyContent:'center', paddingHorizontal:7, fontSize:20, margin:3 }} keyboardType='number-pad' maxLength={1} value={mon2} onChangeText={val=>setMon2(val)}/>
                            <Text style={{fontSize:20}}>:</Text>
                            <TextInput style={{ borderColor:'#16abd5', borderWidth:1 ,width:30, height:30, borderRadius:5, alignItems:'center', justifyContent:'center', paddingHorizontal:7, fontSize:20, margin:3}} keyboardType='number-pad' maxLength={1} value={day1} onChangeText={val=>setDay1(val)}/>
                            <TextInput style={{ borderColor:'#16abd5', borderWidth:1 ,width:30, height:30, borderRadius:5, alignItems:'center', justifyContent:'center', paddingHorizontal:7, fontSize:20,margin:3 }} keyboardType='number-pad' maxLength={1} value={day2} onChangeText={val=>setDay2(val)}/>
                          

                            </View>


                    </View>
                            <TouchableWithoutFeedback onPress={done}>
                                <View style={{height:40, width:150, backgroundColor:'#16abd5', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:20, color:'#ffffff'}}>{'Done'}</Text>
                                </View>  
                            </TouchableWithoutFeedback>
                </View>
            </View>  
        </Modal>
    )
}

export default TimeSetter
