import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import firestore from "@react-native-firebase/firestore"



export function PendingList({target,asal}) {

    const handleAccept = () => {
        console.log("Asal " , asal)
        console.log("Target", target)


        firestore().collection("Users").doc(asal.userId).collection('Friends').doc(target.userId).set({
            friendId : target.userId
        }).then(() => console.log("Berhasil ditambahkan pada asal"))


        firestore().collection("Users").doc(target.userId).collection('Friends').doc(asal.userId).set({
            friendId : asal.userId
        }).then(() => console.log("Berhasil ditambahkan pada target"))

        firestore().collection("Users").doc(asal.userId).collection('Pending').doc(target.userId).delete().then(
            ()=> console.log("Berhasil dihapus"))


        
    }

    const handleReject = () => {
        firestore().collection("Users").doc(asal.userId).collection('Pending').doc(target.userId).delete().then(
            ()=> console.log("Berhasil dihapus"))
    }
 


  return (
    <View style={{borderWidth : 1, marginHorizontal : 20, padding : 20, borderRadius : 10, backgroundColor : "white", flexDirection : "row", alignItems : "center", justifyContent : "space-between", flexWrap : "wrap", rowGap : 20}}>
                    <View>
                        <Image 
                            source={{uri : target.profileUrl}}
                            style={{height : 100, width : 100, borderRadius : 9999}}
                        />
                    </View>
                    <View style={{flexWrap : "wrap"}}>
                        <Text style={{color : "black", fontSize : 22, flexWrap : "wrap"}}>{target.name}</Text>
                        <Text style={{flexWrap : "wrap"}}>{target.email}</Text>
                    </View>
                    <View style={{flexDirection : "row", columnGap : 10}}>
                    <TouchableOpacity style={{backgroundColor : "lightgreen", paddingHorizontal : 20, paddingVertical : 10, borderRadius : 5}} onPress={handleAccept}>
                        <AntDesign name="check" size={24} color ="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor : "red", paddingHorizontal : 20, paddingVertical : 10, borderRadius : 5}} onPress={handleReject}>
                        <Entypo name="cross" size={24} color ="white"/>
                    </TouchableOpacity>
                    </View>
    </View>
  )
}