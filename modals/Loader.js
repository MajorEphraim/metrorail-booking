import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform,
        TouchableWithoutFeedback, ActivityIndicator
    } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const Loader = ({isVisible})=>{

   

    return(
        <Modal visible={isVisible}  transparent={true} animationType='fade' style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                <ActivityIndicator size={'small'} color={'#000000'}/>
            </View>  
        </Modal>
    )
}

export default Loader