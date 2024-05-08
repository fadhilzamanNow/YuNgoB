import { View, Text, TouchableOpacity } from 'react-native'
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
    <View style={{paddingVertical : 10, borderWidth : 1, width: "100%"}}>
      <Text>{users.email}</Text>
    </View>
    </TouchableOpacity>
    </infoUser.Provider>

  )
}

