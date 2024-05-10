import { View, Text, Button } from 'react-native'
import React from 'react'
import firestore from "@react-native-firebase/firestore"

export default function FriendListDetails({info,user}) {

const addFriend = () => {
    console.log("Pengguna" , user)
    console.log("Target Add :", info)
    firestore().collection('Users').doc(user.id).collection('Friends').doc(info.userId).set({
        email : info.email,
        name : info.name,
        profileUrl : info.profileUrl,
        userId : info.userId
    }).then(() => console.log('berhasil'))
    
}
  return (
    <View>
      <Text>{info.email}</Text>
      <Button title="Add" onPress={addFriend}/>
    </View>
  )
}