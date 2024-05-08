import { View, Text } from 'react-native'
import React from 'react'

export default function Home({user,setIsAuthenticated}) {
    console.log("ini adalah : ", user)
  return (
    <View style={{flex : 1, justifyContent : "center", alignItems : "center"}}>
      <Text>Selamat datang, {user.name}</Text>
    </View>
  )
}