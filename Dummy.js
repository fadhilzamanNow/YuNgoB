import { View, Text } from 'react-native'
import React from 'react'

export default function Dummy({route}) {
  const test = route.params
  console.log(test, "info")
  return (
    <View style={{flex : 1, justifyContent : "center", alignItems : "center"}}>
      <Text>c</Text>
    </View>
  )
}