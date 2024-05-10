import { View, Text, TouchableOpacity, Image } from 'react-native'
import React,{useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from "@react-native-firebase/firestore"
import CryptoJS from "react-native-crypto-js";
 


import { createContext } from 'react';


export default function ChatItem({users,user}) {
    const [lastMessage,setLastMessage] = useState(null)


    let getRoomId = (idpengirim,idpenerima) => {
        const sortedIds = [idpengirim,idpenerima].sort();
        const roomId = sortedIds.join('-');
        return roomId
    }

    useEffect(() => {
        
        let roomId = getRoomId(user.id,users.userId); 
        let cari = firestore().collection('Rooms').doc(roomId).collection('Messages').orderBy("createdAt","desc")
        .onSnapshot(document => {
            let pesan = document.docs.map(doc => {
                return doc.data(); 
            })

            setLastMessage(pesan[0] ? pesan[0] : null)
            
        })

        return cari

    },[])

    let pesan = () => {
        if(typeof lastMessage == 'undefined') return 'Loading ...'
        if(lastMessage){
            let pesan = CryptoJS.AES.decrypt(lastMessage.messages,'secret key 123')
            let decryptPesan = pesan.toString(CryptoJS.enc.Utf8)
            if(user.id == lastMessage.senderId){
                return "You : " + decryptPesan
            }
            else{
                return decryptPesan
            }
        }else{
            return "Ayo mulai percakapanmu dengan " + users.name
        }
    }

    let waktu = () => {
        if(typeof lastMessage == 'undefined') return 'Loading...'
        if(lastMessage){
            let waktu = lastMessage.createdAt
            let convertWaktu = new Date(waktu.seconds * 1000).toTimeString().split(' ')[0].slice(0,5)
            return convertWaktu
        }
    }

    

    const navigation = useNavigation();

    return(
        <TouchableOpacity onPress={()=> navigation.navigate('ChatRoom',{message : "Ini dari ChatItem", users : users, user : user})}>
            <View style={{paddingVertical : 20, borderBottomWidth : 1, flexDirection : "row", alignItems : "center", marginHorizontal : 20, borderBottomColor : "lightgray"}}>
                <View style={{flex : 1, flexDirection : "row", alignItems : "center"}}>

                    <View style={{backgroundColor : "black", height : 40, width : 40, marginLeft : 20, borderRadius : 9999}}>
                        <Image 
                            source={{uri : users.profileUrl}}
                            style={{height : 40, width : 40, borderRadius : 9999}}
                            />
                    </View>
                
                    <View style={{marginLeft : 10}}>
                        <Text style={{color : "black", fontWeight : "bold"}}>{users.name}</Text>
                        <Text>{pesan()}</Text>
                    </View>
                </View>
                <View style={{marginRight : 20}}>
                    <Text>{waktu()}</Text>
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

