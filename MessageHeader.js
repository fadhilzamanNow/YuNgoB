import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const MessageHeader = ({users}) => {
    
    const navigation = useNavigation();
  return (

    <SafeAreaView style={{padding : 5,backgroundColor : "white", flexDirection : "row", height : 50, columnGap : 10 , alignItems : "center" }}>
    <View style={{width : 30, alignItems : "center"}}>
      <Ionicons 
        name="chevron-back-outline"
      
        size={24}
        color="black"
        onPress={()=> navigation.goBack()}
      />
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