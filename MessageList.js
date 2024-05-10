import { View, Text } from 'react-native'
import React from 'react'
import CryptoJS from "react-native-crypto-js"

export function MessageList({texts,user}) {
  let bytes = CryptoJS.AES.decrypt(texts.messages,'secret key 123')
  let encryptMessage = bytes.toString(CryptoJS.enc.Utf8);

  if(texts.senderId ==  user.id){
    return (
        <View style={{flexDirection : "row", justifyContent : "flex-end", height : "auto"}} >
            <View style={{flexDirection : "row", padding : 10, backgroundColor : "red", justifyContent : "center", alignItems : "center", borderRadius : 5, marginRight : 10, marginLeft : 50,borderColor : "lightgray", borderWidth :1}}>
                <Text style={{color : "white", fontSize : 16}}>{encryptMessage}</Text>
                <Text style={{}}></Text>
            </View>
        </View>
    )
  }
  return (
    <View style={{flexDirection : "row", justifyContent : "flex-start", height : "auto"}} >
            <View style={{flexDirection : "row", padding : 10, backgroundColor : "white", justifyContent : "center", alignItems : "center", borderRadius : 5, marginLeft : 10, marginRight : 50, borderColor : "lightgray", borderWidth :1}}>
                <Text style={{color : "black", fontSize : 16}}>{encryptMessage}</Text>
            </View>
        </View>
  )
}