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


  let [listFriend,setListFriend] = useState(false)

  useEffect(() => {
    
    


    let unsubscribe = firestore().collection('Users').doc(user.userId).collection('Friends').onSnapshot(
      (querySnapshot) => {
        let getFriendId = []
        querySnapshot.forEach(
          (doc) => {
            getFriendId.push(doc.data().friendId)
          }
        )
        console.log("get friend id ", getFriendId);
        if(getFriendId.length != 0){
          firestore().collection('Users').where("userId","in",getFriendId).onSnapshot(
            (querySnapshot) => {
              let getFriend = []
              querySnapshot.forEach((doc) => {
                getFriend.push(doc.data())
              }
            )
            setListFriend(getFriend)
            }
          )
        }
        
      }
    )
    
    return () => unsubscribe

  },[])

  useEffect(()=> {
    console.log("get friend :", listFriend)
  },[listFriend])
  
     
  
  return (
    <SafeAreaView style={{flex : 1, backgroundColor : "white"}}>
      <View style={{flex : 1}} >
      <ScrollView>
        {listFriend ? (
            <HomeHeader users={users} user={user} friends={listFriend} />
        ) : (
          <View style={{borderTopWidth : 1, borderTopColor : "lightgray", flex : 1, justifyContent : "center", alignItems : "center"}}>
            <Text>Selamat Datang, {user.name} </Text>
            <Text>Kamu masih belum memiliki Teman, Ayo Cari Teman</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddFriend',{user : user})}>
            <View style={{marginTop : 20, borderWidth : 1, borderRadius : 5, padding : 10, backgroundColor : "red", borderColor : "red"}}>
                <Text style={{color : "white"}}>Mulai Perjalananmu di YuNgoB</Text>
            </View>
            </TouchableOpacity>
          </View>
        )}
    </ScrollView>
      </View>
      
      
    </SafeAreaView>
  )
}