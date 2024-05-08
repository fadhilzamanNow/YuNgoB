import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ChatItem({user,index}) {
  return (
    <TouchableOpacity>
    <View style={{paddingVertical : 10, borderWidth : 1, width: "100%"}}>
      <Text>{user.email}</Text>
    </View>
    </TouchableOpacity>
  )
}

