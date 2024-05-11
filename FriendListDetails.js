import { View, Text, Button } from 'react-native'
import React from 'react'
import firestore from "@react-native-firebase/firestore"
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'

export default function FriendListDetails({info,user}) {

const addFriend = () => {
    console.log("Pengguna" , user)
    console.log("Target Add :", info)
    
    firestore().collection('Users').doc(info.userId).collection('Pending').doc(user.userId).set({
      email : user.email,
      name : user.name,
      profileUrl : user.profileUrl,
      userId : user.userId
  }).then(() => console.log('berhasil menambahkan sebagai pending')).catch((e) => {
    console.log("error",e)
  })
    

    
}
  return (
    <View style={{alignItems : "center", rowGap : 20}}>
      <View style={{height : 150, width : 150, borderRadius : 9999, backgroundColor : "black"}}>
        <Image 
        source={info.profileUrl}
        style={{height : 50, width : 50,  borderRadius : 9999 }}
        />
      </View>
      <Text style={{fontSize : 20}}>{info.name}</Text>
      
      <TouchableOpacity>
        <View style={{backgroundColor : "red", paddingHorizontal : 40, paddingVertical : 10, borderRadius : 10}}>
          <Text style={{color : "white"}}>Add</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}