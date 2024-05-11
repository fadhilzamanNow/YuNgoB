import { View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button } from 'react-native'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { TouchableOpacity } from 'react-native'
import firestore from "@react-native-firebase/firestore"


export default function Settings({route}) {
    const {user,signOut} = route.params

    const statusRef = useRef();
    const [status,setStatus] = useState('');

    const handleStatus = () => {
      firestore().collection('Users').doc(user.userId).update({
        status : status
      }).then(() => console.log("sukses ganti status"))
    }

    const handleChange = (text) => {
        console.log(user)
        statusRef.current = text;
        setStatus(statusRef.current)
    }

    const pesan = "\" " + user.status + " \"" 
  return (
    <KeyboardAvoidingView style={{flex :1, backgroundColor : "white"}}>
    <ScrollView style={{flex : 1}}>     

      <View style={{flex : 1, backgroundColor : "white", borderTopWidth : 1, borderTopColor : "lightgray", alignItems : "center"}}>
        <View style={{height : 200, width : 200, marginTop : 40, backgroundColor : "black", borderRadius :9999 }}>
            <Image 
            source={{uri : user.profileUrl}}
            style={{height : 200, width : 200, borderRadius :9999}}
            />
        </View>
        <View style={{alignItems : "center", flex : 1, marginTop : 20}} >
      <Text style={{color : "black", fontSize : 32,fontWeight : 500}}>{user.name}</Text>
      <Text style={{color : "gray", fontSize : 24,fontWeight : 300}}>{user.email}</Text>
          <View style={{marginTop : 30 }}>
          { user.status ? (
            <View style={{alignItems : "center"}} >
              <Text style={{fontSize : 22}}>{pesan}</Text>
            </View>) : (
              <View >
              <View style={{alignItems : "center"}}>
                <Text>Kamu Belum memiliki Pesan Status Apapun</Text>
                <Text>Tulis Statusmu yang Pertama</Text>
              </View>
                <View style={{borderWidth : 1, height : 40, justifyContent : "center", borderRadius : 10, borderColor : "lightgray", marginTop : 20}}>
                  <TextInput placeholder='Tulis Pesan' style={{padding : 0, marginLeft : 10}} ref={statusRef} onChangeText={handleChange}/>
                </View>
                <TouchableOpacity onPress={handleStatus}>
                  <View style={{backgroundColor : 'red', justifyContent : "center", alignItems : "center", padding : 10, margin : 50, borderRadius : 10}}>
                    <Text style={{color : "white"}}>Set As Status</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) 
            }
            
            </View>
            
        </View>
        
        

      
    </View>
    </ScrollView>
    <TouchableOpacity style={{alignItems : "flex-end", marginRight : 70, marginBottom : 50}} onPress={signOut}>
                <View style={{marginTop : 20, flexDirection : "row", alignItems : "center"}}>
                      <MaterialCommunityIcons name="logout" size={36} color="red"/>
                      <Text style={{fontSize : 18, fontWeight : 700, color : "red"}}>Log Out</Text>
                </View>
            </TouchableOpacity>
    </KeyboardAvoidingView>
    
  )
}