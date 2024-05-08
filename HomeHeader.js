import { View, Text, Image, TouchableOpacity, Alert, TextInput } from 'react-native'
import React from 'react'

const HomeHeader = () => {
  return (
    <View style={{padding: 5, backgroundColor : "white", alignItems : "center"}}>
      <Text style={{fontSize : 44, fontWeight : 600, color : "red"}} >YuNgoB</Text>
      
    
      <View style={{backgroundColor : "white", 
      flexDirection : "row", 
      alignItems : "center",
      borderRadius : 20,
      marginHorizontal : 10,
      marginVertical : 5,
      borderWidth : 1,
      borderColor : "gray"
      }}>
        
        <View style={{flex : 1, marginLeft : 15, padding : 0}}>
        <TextInput placeholder='Tuliskan .....' style={{color : "white"}} placeholderTextColor="gray" />
        </View>
        
      </View>
      
    </View>
  )
}

export default HomeHeader