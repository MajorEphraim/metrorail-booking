import React, { useState, useEffect, Text } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from './StackNavigator';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ()=>{
    return(
        <Drawer.Navigator 
            screenOptions={{headerShown:false}}
            drawerContent={DrawerContent}
            
        >
            <Drawer.Screen name="Home stack" component={HomeStack} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
