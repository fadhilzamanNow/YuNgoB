import { View, Text } from 'react-native'
import React from 'react'

export default function Dummy({route}) {
  const {user,signOut} = route.params
  return (
    <View style={{flex : 1, justifyContent : "center", alignItems : "center"}}>
      <Text>{user.name}</Text>
    </View>
  )
}