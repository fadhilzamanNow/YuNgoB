import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"

export default function Splash() {

  return (
    <View style={{flex : 1, justifyContent : "center", alignItems : "center", backgroundColor : "red"}}>
        {StatusBar.setHidden(true)}
        <View>
            <AntDesign name="wechat" size={200} color="white" />
        </View>
      <Text style={{fontSize : 80, color : "white", fontWeight : 700}}>YuNgoB</Text>
    </View>
  )
}