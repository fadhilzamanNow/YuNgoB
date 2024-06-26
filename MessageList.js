import { View, Text, Image } from 'react-native'
import React from 'react'
import CryptoJS from "react-native-crypto-js"

export function MessageList({texts,user}) {
  let bytes = CryptoJS.AES.decrypt(texts.messages,'secret key 123')
  let encryptMessage = bytes.toString(CryptoJS.enc.Utf8);


  let waktukirim = new Date(texts.createdAt.seconds*1000).toTimeString().split(' ')[0].slice(0,5)
  

  if(texts.senderId ==  user.userId){
    return (
        <View style={{flexDirection : "row", justifyContent : "flex-end", height : "auto"}} >
            <View style={{flexDirection : "column", padding : 10, backgroundColor : "red", justifyContent : "center", alignItems : "flex-end", borderRadius : 5, marginRight : 10, marginLeft : 50,borderColor : "lightgray", borderWidth :1}}>
                <View>
                {
                texts.type == "text" ? (
                  <Text style={{color : "white", fontSize : 18}}>{encryptMessage}</Text>
                ) : (
                  <Image 
                    source={{uri : encryptMessage}}
                    style={{height : 200, width : 200, borderRadius : 5}}
                  />
                )
                }
                </View>
                <Text style={{color : "white", fontSize : 10}}>{waktukirim}</Text>
            </View>
        </View>
    )
  }
  return (
    <View style={{flexDirection : "row", justifyContent : "flex-start", height : "auto"}} >
            <View style={{flexDirection : "column", padding : 10, backgroundColor : "white", justifyContent : "center", alignItems : "flex-end", borderRadius : 5, marginLeft : 10, marginRight : 50, borderColor : "lightgray", borderWidth :1}}>
                <View>
                {
                texts.type == "text" ? (
                  <Text style={{color : "black", fontSize : 18}}>{encryptMessage}</Text>
                ) : (
                  <Image 
                    source={{uri : encryptMessage}}
                    style={{height : 200, width : 200, borderRadius : 5}}
                  />
                )
                }
                </View>
                <Text style={{color : "black", fontSize : 10}}>{waktukirim}</Text>
            </View>
        </View>
  )
}