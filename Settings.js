import { View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-native'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Foundation from "react-native-vector-icons/Foundation"
import { TouchableOpacity } from 'react-native'
import firestore from "@react-native-firebase/firestore"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"


export default function Settings({route}) {
    const {user,signOut} = route.params
    const [toggle,setToggle] = useState(false);
    const statusRef = useRef();
    const [status,setStatus] = useState('');
    const [change,setChange] = useState('');
    const [stat,setStat] = useState('');

    useEffect(() => {
      firestore().collection('Users').doc(user.userId).onSnapshot(
        (documentSnapshot) => {
          let pesan = `\" ${documentSnapshot.data().status} \"`
          setStat(pesan)
          console.log("change data : " , stat);
        }
      )
    },[])

    

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

    const handleToggle = () => {
      setToggle(true)
    }

    const handleCross = () => {
      setToggle(false)
    }

    const listenChange = (text) => {
      listenRef.current =text 
      setChange(listenRef.current)
    }

    const submitChange = async () => {
      try{
      await firestore().collection('Users').doc(user.userId).update({
        status : change
      })
      console.log("Success Change")
      setToggle(false)

      }
      catch(e){
        console.log("Failed to Change :", e)
      }
    }

    const listenRef = useRef()
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
          { stat ? (
            <View style={{flexDirection : "column", justifyContent : "center", alignItems : "center"}} >
              <Text style={{fontSize : 22}}>{stat}</Text>
              <TouchableOpacity style={{marginTop : 10}} onPress={handleToggle}>
                <Foundation name="pencil" size={24} color="lightgray"/>
              </TouchableOpacity>

              {toggle? ( <View style={{borderWidth : 1, borderColor :"lightgray", paddingVertical :  3, paddingHorizontal : 10, borderRadius : 6, marginTop : 10, width : 300, flexDirection : "row", alignItems : "center"}}>
                <View style={{flex : 1}}>
                  <TextInput  style={{padding : 0}} placeholder='Status Barumu' onChangeText={listenChange} ref={listenRef} />
                </View>
                <View style={{flexDirection : "row", columnGap : 10}}>
                  <TouchableOpacity onPress={submitChange}>
                  <AntDesign name="check"  size={24}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCross}>
                  <Entypo name="cross" size={24} />
                  </TouchableOpacity>
                </View>
              </View > ) : (null) }
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