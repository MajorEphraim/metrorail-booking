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

const ChooseMethod = ({isVisible,setIsVisible,setMethod})=>{
 
    const data = ["Card", "Cash"]
     
    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)', flexDirection:'column'}}>
                <View style={{ backgroundColor:'#ffffff', height:.24*height, width:.45*width,borderRadius:25, padding:15, alignItems:'center'}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontSize:0.041*width, fontWeight:'bold', }}>Choose method</Text>
                    </View>
                    <View style={{flex:1,marginTop:20, justifyContent:'space-between', paddingBottom:5}}>
                      
                                <FlatList
                                data={data}
                                keyExtractor={item=>item}
                                style={{marginVertical:6, height:0.5*height}}
                                renderItem={({item})=>(
                                    <TouchableOpacity onPress={()=>{setMethod(item), setIsVisible(false)}} style={{width:'100%', flexDirection:'row', justifyContent:'space-evenly', backgroundColor:'#16abd5',alignItems:'center', marginBottom:5, height:30, paddingHorizontal:5}}>
                                        <Text style={{fontSize:0.037*width, color:'#ffffff', marginRight:10}}>{item}</Text>
    
                                    </TouchableOpacity>
                                )}
                            />
                    </View>
                </View>
            </View>  
        </Modal>
    )
}

export default ChooseMethod
