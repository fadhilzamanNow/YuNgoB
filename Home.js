import { View, Text, SafeAreaView, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import ChatItem from './ChatItem';
import HomeHeader from './HomeHeader';
import {ChatContainer} from './ChatContainer';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';



export default function Home({route}) {
  const fake = "fake"
  const {user,signOut} = route.params;
  let listUser = []
  const [users,setUsers] = useState([]);

  const navigation = useNavigation()


  useEffect(() => {
   
   firestore()
  .collection('Users')
  .where("userId","!=",user.userId)
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


  let [listFriend,setListFriend] = useState([])

  useEffect(() => {

    
    let unsubscribe = firestore().collection('Users').doc(user.userId).collection('Friends').onSnapshot(
        (querySnapshot) => {
          const friendsData = [] 
  
          querySnapshot.forEach((documentSnapshot) => {
            // Process each friend document
            friendsData.push(documentSnapshot.data())
  
          })
          setListFriend(friendsData);
        }
      )
    

      return () => unsubscribe()
    
    

  },[])

  useEffect(()=> {

  },[listFriend])
  
    
  
  return (
    <SafeAreaView style={{flex : 1, backgroundColor : "white"}}>
      <View style={{flex : 1}} >
      <ScrollView>
        {listFriend.length == 0 ? (
          <View style={{borderTopWidth : 1, borderTopColor : "lightgray", flex : 1, justifyContent : "center", alignItems : "center"}}>
            <Text>Selamat Datang, {user.name} </Text>
            <Text>Kamu masih belum memiliki Teman, Ayo Cari Teman</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddFriend',{user : user})}>
            <View style={{marginTop : 20, borderWidth : 1, borderRadius : 5, padding : 10, backgroundColor : "red", borderColor : "red"}}>
                <Text style={{color : "white"}}>Mulai Perjalananmu di YuNgoB</Text>
            </View>
            </TouchableOpacity>
          </View>

        ) : (
                  <HomeHeader users={users} user={user} friends={listFriend} />
        )}
    </ScrollView>
      </View>
      
      
    </SafeAreaView>
  )
}