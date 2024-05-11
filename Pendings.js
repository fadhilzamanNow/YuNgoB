import { View, Text, Button, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import firestore from "@react-native-firebase/firestore"
import { list } from 'firebase/storage'
import AntDesign from "react-native-vector-icons/AntDesign"
import { TouchableOpacity } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo"
import {PendingList} from './PendingList'

export default function Pendings({route}) {
    const {user} = route.params
    const [pendingList,setPendingList] = useState([])

    useEffect(() => {
        let unsubscribe = firestore().collection('Users').doc(user.userId).collection('Pending').onSnapshot(
            (documentSnapshot) => {
                let listPending = []
                documentSnapshot.forEach((document) => {
                    listPending.push(document.data())
                })
                try{
                    setPendingList(listPending)
                    console.log("list pending : ", pendingList)
                }catch(e){

                    console.log("error",e )
                }

            }
        )

        return () => unsubscribe();

    },[])

    try{
        console.log(user)
    }
    catch(e){
        console.log("error",e)
    }

    
  return (
    <ScrollView>
    
    <View style={{flex : 1, borderTopColor : "lightgray", borderTopWidth : 1, flexDirection : "column"}}>
      <View style={{marginTop : 20, flexDirection : "column", rowGap : 20}}>
        {pendingList.map((pending,index) => {
            return (

                <PendingList target={pending} asal={user} />
            )
        })}
      </View>
    </View>
    </ScrollView>
  )
}