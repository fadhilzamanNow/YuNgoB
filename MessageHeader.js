import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'

const MessageHeader = ({users}) => {
    console.log(users)
  return (

    <SafeAreaView style={{padding : 5, backgroundColor : "white", flexDirection : "row", height : 50, columnGap : 10 , alignItems : "center" }}>
    <View style={{width : 20, height : 20}}>

    </View>
    <View style={{backgroundColor:"white"}}>
        <Image 
        source={require('./assets/images/profil.jpg')}
        style={{width : 40, height : 40, borderRadius : 9999}}
        />
    </View>
    <View style={{backgroundColor: "white", }}>
      <Text style={{fontSize : 20, fontWeight : 600, color : "black"}}>{users.name}</Text>
    </View>
    </SafeAreaView>
  )
}

export default MessageHeader