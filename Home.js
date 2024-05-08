import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import ChatItem from './ChatItem';



export default function Home({user,signOut}) {
  const fake = "fake"

  let listUser = []
  const [users,setUsers] = useState([]);

  useEffect(() => {
   
   firestore()
  .collection('Users')
  .where("userId","!=",user.id)
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      listUser.push(documentSnapshot.data())
    });
  })
  .then(() => {
    setUsers(listUser)
    console.log(users)
  })

  },[])
    
  
  return (
    <View style={{flex : 1, alignItems : "center"}}>
      <Text>Selamat datang, Bro {user.name}</Text>
      <View style={{flex : 1, width : "100%"}}>
      {users.map((users,index)=> {
        return <ChatItem users={users} key={index} user={user}/>
      })}
      </View>
      <Button title='Keluar' onPress={signOut}/>
      <View>
      </View>
    </View>
  )
}