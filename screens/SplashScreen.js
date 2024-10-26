import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import splash from '../assets/pictures/splash.png'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const SplashScreen = ()=>{
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Image
                style={{flex:1, resizeMode:'contain', width:width, height:width}}
                source={splash}
            />
        </View>

    )
}

export default SplashScreen