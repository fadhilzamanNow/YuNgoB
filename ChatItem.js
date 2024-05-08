import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


import { useContext } from 'react';
import { createContext } from 'react';

export const infoUser = createContext();

export default function ChatItem({users,index,user}) {

    const datas =[12,3,6]
    
    const navigation = useNavigation();
  return (
    <infoUser.Provider value={datas}>
    <TouchableOpacity onPress={()=> navigation.navigate('ChatRoom',{message : "Ini dari ChatItem", users : users, user : user})}>
    <View style={{paddingVertical : 10, borderBottomWidth : 1, flexDirection : "row", alignItems : "center", marginHorizontal : 20}}>
            <View style={{flex : 1, flexDirection : "row", alignItems : "center"}}>
                <Image 
                    source={(require('./assets/images/profil.jpg'))}
                    style={{height : 40, width : 40, marginLeft : 20, borderRadius : 9999}}
                    />
                <View style={{marginLeft : 10}}>
                    <Text style={{color : "black", fontWeight : "bold"}}>{users.name}</Text>
                    <Text>Last Message</Text>
                </View>
            </View>
        <View style={{marginRight : 20}}>
            <Text>16.02</Text>
        </View>
    </View>
    </TouchableOpacity>
    </infoUser.Provider>

  )
}

