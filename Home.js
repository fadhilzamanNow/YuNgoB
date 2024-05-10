import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import ChatItem from './ChatItem';
import HomeHeader from './HomeHeader';
import {ChatContainer} from './ChatContainer';
import { useRef } from 'react';



export default function Home({route}) {
  const fake = "fake"
  const {user,signOut} = route.params;
  let listUser = []
  const [users,setUsers] = useState([]);

  useEffect(() => {
   
   firestore()
  .collection('Users')
  .where("userId","!=",user.id)
  .get()
  .then(querySnapshot => {

    querySnapshot.forEach(documentSnapshot => {
      listUser.push(documentSnapshot.data())
    });
  })
  .then(() => {
    setUsers(listUser)
  })

  },[])
  
    
  
  return (
    <SafeAreaView style={{flex : 1, backgroundColor : "white"}}>
      <View style={{flex : 1}} >
      <ScrollView>
        <HomeHeader users={users} user={user} />
    </ScrollView>
      </View>
      
      
    </SafeAreaView>
  )
}