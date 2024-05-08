import { View, Text } from 'react-native'
import React from 'react'

export function MessageList({texts,user}) {

  if(texts.senderId ==  user.id){
    return (
        <View style={{flexDirection : "row", justifyContent : "flex-end", height : "auto"}} >
            <View style={{flexDirection : "row", padding : 10, backgroundColor : "red", justifyContent : "center", alignItems : "center", borderRadius : 5, marginRight : 10, marginLeft : 50}}>
                <Text style={{color : "white", fontSize : 16}}>{texts.messages}</Text>
                <Text style={{}}></Text>
            </View>
        </View>
    )
  }
  return (
    <View style={{flexDirection : "row", justifyContent : "flex-start", height : "auto"}} >
            <View style={{flexDirection : "row", padding : 10, backgroundColor : "white", justifyContent : "center", alignItems : "center", borderRadius : 5, marginLeft : 10, marginRight : 50}}>
                <Text style={{color : "black", fontSize : 16}}>{texts.messages}</Text>
            </View>
        </View>
  )
}