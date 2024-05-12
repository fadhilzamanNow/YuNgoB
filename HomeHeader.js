import { View, Text, Image, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { ChatContainer } from './ChatContainer'

const HomeHeader = ({users,user,friends}) => {
  const inputRef = useRef()
  const [filteredUsers,setFilteredUsers] = useState(friends);
  const [search,setSearch] =useState('expess')
  

  const handleSearch = (text) => {
    inputRef.current = text
    const filteredData = friends.filter((friends)=> {
      return friends.name.toLowerCase().includes(inputRef.current.toLowerCase());
    })
    setFilteredUsers(filteredData)
    console.log(filteredUsers)
  }

  useEffect(()=>{
    setFilteredUsers(friends)
    console.log("users")
  },[friends])

  const handleFind = (text) => {
    inputRef.current = text
    console.log(inputRef.current)
  }


  return (
    <View>
      <View>

      </View>
    <View style={{padding: 5, backgroundColor : "white", alignItems : "center", borderBottomWidth : 1, borderBottomColor : "lightgray"}}>
      
      
    
      <View style={{backgroundColor : "white", 
      flexDirection : "row", 
      alignItems : "center",
      borderRadius : 5,
      marginHorizontal : 20,
      marginVertical : 1,
      borderWidth : 1,
      borderColor : "lightgray",
      padding : 5,
      borderBottomWidth : 1,
    }}>
        
        <View style={{flex : 1, padding : 0, flexDirection : "row", justifyContent : "center", alignItems : "center", marginHorizontal : 10}}>
        <TextInput placeholder='Tuliskan .....' style={{color : "black",height : 20, padding : 0, flex : 1}} placeholderTextColor="gray" onChangeText={handleSearch} ref={inputRef} />
        <TouchableOpacity onPress={() => Alert.alert('Pencarian dimulai')}>
        <AntDesign name="search1" />
        </TouchableOpacity>
        </View>
        
      </View>
      
    </View>
      <View style={{flex : 1, backgroundColor : "white"}}>
          <ChatContainer user={user} friends={filteredUsers}/>
        </View>
        </View>
  )
}

export default HomeHeader