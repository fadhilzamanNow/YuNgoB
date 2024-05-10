import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { Image } from 'react-native'
export default function Settings({route}) {
    const {user,signOut} = route.params
    console.log(user.photo)
  return (
    <View style={{flex :1}}>
    <View style={{flex : 1, backgroundColor : "white", borderTopWidth : 1, borderTopColor : "lightgray", alignItems : "center"}}>
        <View style={{height : 200, width : 200, borderRadius : 9999, marginTop : 40}}>
            <Image 
            source={{uri : user.photo}}
            style={{height : 200, width : 200, borderRadius : 9999}}
            />
        </View>
        <View style={{alignItems : "center", flex : 1, marginTop : 20}} >
      <Text style={{color : "black", fontSize : 32,fontWeight : 500}}>{user.name}</Text>
      <Text style={{color : "gray", fontSize : 24,fontWeight : 300}}>{user.email}</Text>
        </View>
        

      
    </View>
      <View>
         <Button title='Keluar' onPress={signOut} color="red"/>

      </View>
    </View>


  )
}