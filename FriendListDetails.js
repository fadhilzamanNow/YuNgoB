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
    }).then(() => console.log('berhasil menambahkan sebagai teman'))


    firestore().collection('Users').doc(info.userId).collection('Pending').doc(user.id).set({
        email : user.email,
        name : user.name,
        profileUrl : user.photo,
        userId : user.id
    }).then(() => console.log('berhasil menambahkan sebagai pending'))
      
}
  return (
    <View>
      <Text>{info.email}</Text>
      <Button title="Add" onPress={addFriend}/>
    </View>
  )
}