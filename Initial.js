import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginPage from './LoginPage'
import Splash from './Splash'
import { useNavigation } from '@react-navigation/native'
export default function Initial() {
    const [splash,setSplash] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            setSplash(false)
        },2000)
    },[])

    useEffect(() => {
        if(!splash){
            navigation.navigate('LoginPage')
        }
    },[splash])

  return (
    <View style={{flex : 1}}>
        {splash ? (<Splash />) : (null)}
    </View>
  )
}