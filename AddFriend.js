import { View, Text, TextInput, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {AddFriendList} from './AddFriendList';


export function AddFriend({route}) {

    const [users,setUsers] = useState([])
    let listUser = []
    const {user} = route.params
    const [filterUser,setFilterUser] = useState(users)
    const [filter,setFilter] = useState('')
    useEffect(() => {
        let listAvailable = []

        firestore().collection('Users').doc(user.userId).collection('Friends').onSnapshot((querySnapshot) => {
          querySnapshot.forEach((document) => {
              listAvailable.push(document.id)
          })
          console.log("list Available : ", listAvailable)
        })
        
        firestore()
       .collection('Users')
       .where("userId","!=",user.userId)
       .onSnapshot(querySnapshot => {
        const filteredUsers = querySnapshot.docs.filter(doc => !listAvailable.includes(doc.id));
        const userList = filteredUsers.map(doc => doc.data());
        setUsers(userList);     
       })
       
     
       },[])

    
       
    let handleSend = () => {
        const filteredFriend = users.filter((friend)=> {
            return friend.email.toLowerCase() == filter.toLowerCase()
        })

        setFilterUser(filteredFriend);
        
    }

    const inputChange = useRef()
    let handleChange = (text) => {
        inputChange.current = text
        setFilter(inputChange.current)
    }


    
    
       

  return (
    <View style={{flex : 1, borderTopWidth : 1, borderTopColor : "lightgray", backgroundColor : "white"}}>
      <View style={{marginTop : 20 , marginLeft : 20, color : "black", marginRight : 20}}>
        <Text style={{color : "black", fontSize : 16, fontWeight : 700}}>Coba Cari Teman Yuk</Text>
        <View style={{borderWidth : 1, borderColor : 'lightgray', borderRadius : 5, marginTop : 20, height : 30, flexDirection : "row", alignItems : "center"}} >
            
        <TextInput placeholder='Cari Email .....' style={{color : "black", padding : 0, flex : 1, marginLeft : 20}} placeholderTextColor="gray"  ref={inputChange} onChangeText={handleChange}/>
        <TouchableOpacity >
        <AntDesign name="search1"  style={{marginRight : 20}} onPress={handleSend}/>
        </TouchableOpacity>
        
        </View>
        
      </View>
        <View style={{marginTop : 20, flex : 1}}>
                <AddFriendList filterUser={filterUser} user={user}/>    
            </View>
    </View>
  )
}