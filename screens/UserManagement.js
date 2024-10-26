import React, { useState } from 'react'
import { View, Text, TouchableOpacity, 
        Dimensions, Modal, Platform,
        TouchableWithoutFeedback, FlatList,
        Image
    } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AddButton from '../components/AddButton'
import { useNavigation } from '@react-navigation/native'
import UserModal from '../modals/UserModal'
import SearchBar from '../components/SearchBar'

import avatar from '../assets/pictures/avatar.jpeg'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const UserManagement = ()=>{
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const users = useSelector(state=>state.usersState.allUsers)
    const [scheduleId, setScheduleId] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [searched, setSearched] = useState('')
    
      const handleRemove = (item)=>{
        setScheduleId(item.id)
        setIsVisible(true)
      }
    
      const searchedUsers = users.filter(item=>item.firstName.toLowerCase().indexOf(searched.toLowerCase()) !== -1 || item.lastName.toLowerCase().indexOf(searched.toLowerCase()) !== -1)
    return(
           
                <View style={{ flex:1, backgroundColor:'#ffffff', height:.85*height, width, borderTopEndRadius:25, borderTopStartRadius:25, padding:15, justifyContent:'space-between'}}>
                   <SearchBar searched={searched} setSearched={setSearched} placeholder='...search users'/>
                    <View style={{flex:1,marginTop:20, justifyContent:'space-between', paddingBottom:30}}>
                        <FlatList
                            data={searchedUsers}
                            keyExtractor={item=>item.id}
                            style={{marginVertical:6, height:0.5*height}}
                            renderItem={({item})=>(
                                <View style={{ flexDirection:'row',justifyContent:'space-between' ,marginBottom:5, alignItems:'center', padding:5}}>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <View style={{height:50, width:50, borderRadius:300, backgroundColor:'#f5f5f5', marginRight:10}}>
                                            <Image source={ item.profilePic === null ? avatar:{uri:item.profilePic}} style={{height:50, width:50, borderRadius:300,}}/>                                        
                                        </View>
                                        <Text style={{fontSize:0.045*width, color:'#000000', marginRight:10}}>{item.firstName} {item.lastName}</Text>
                                    </View>
                                 
                                    {/* <TouchableOpacity onPress={()=>handleRomove(item.id)} style={{height:'100%', flexDirection:'column', alignItems:'center'}}>
                                    <MaterialIcons name="cancel" color={'#ca1616'} size={22}/>
                                        <Text style={{fontSize:0.037*width, color:'#ca1616'}}>Remove</Text>
                                    </TouchableOpacity> */}
                                </View>
                            )}
                        />
                  
                    </View>

                    <AddButton name={'Add user'} handlePress={()=>setIsVisible(true)}/>
                    <UserModal isVisible={isVisible} setIsVisible={setIsVisible}/>
                </View>
    )
}


export default UserManagement



