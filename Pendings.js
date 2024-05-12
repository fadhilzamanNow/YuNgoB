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

    const [orang,setOrang] = useState(false);

    useEffect( () => {



            let unsubscribe = firestore().collection('Users').doc(user.userId).collection('Pending').onSnapshot(
                (querySnapshot) => {      
                    let listUserId = []         
                    querySnapshot.forEach((doc) => {
                        listUserId.push(doc.data().pendingId)
                    })
                    console.log("list id : ", listUserId)
                    if(!(listUserId.length == 0)){
                        firestore().collection('Users').where("userId",'in',listUserId).onSnapshot(
                            (querySnapshot) => {
                                let listUser = []

                                querySnapshot.forEach((doc) => {
                                    listUser.push(doc.data())
                                })
                                setOrang(listUser)
                                console.log("list User : ", listUser)
  
                            }
                        )
                    }
                    else{
                        setOrang([])
                    }
                    
                }
            )

          return () => unsubscribe
    },[])

    
    useEffect(()=>{
        let angka = []
        angka.push(1)
        console.log(angka)
        console.log("data berubah" ,orang)


        return () => angka
    },[orang])

    console.log("sisa orang : ", orang)
     




    try{
        console.log(user)
    }
    catch(e){
        console.log("error",e)
    }
 


    
  return (
    <ScrollView>
        {orang.length > 0 ? 
        (
        <View style={{flex : 1, borderTopColor : "lightgray", borderTopWidth : 1, flexDirection : "column"}}>
            <View style={{marginTop : 20, flexDirection : "column", rowGap : 20}}>
              {orang.map((pending,index) => {
                  return (
      
                      <PendingList target={pending} asal={user} key={index}/>
                  )
              })}
            </View>
        </View>
        ) : ( 
        <View style={{flex : 1, alignItems : "center"}}>
            <Text>Kosong, kasiann dehhh</Text>
            <Text>Belum ada Orang Yang Minat kwkwwk</Text>
        </View>) }
    
    </ScrollView>
  )
}