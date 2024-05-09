import { View, Text, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useContext } from 'react';
import { infoUser } from './ChatItem';
import firestore from "@react-native-firebase/firestore"
import { Timestamp } from 'firebase/firestore';
import { Icon } from 'react-native-elements';
import { useRef } from 'react';
import { Button } from 'react-native';
import {MessageList} from './MessageList';
import MessageHeader from './MessageHeader';
import { Image } from 'react-native';
import CryptoJS from "react-native-crypto-js";



export default function ChatRoom() {

    let cipherText = CryptoJS.AES.encrypt('my messaage', 'secret key 123').toString();
    console.log("hash : ", cipherText)
    let bytes = CryptoJS.AES.decrypt(cipherText,'secret key 123')
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("original :", originalText)
    const textRef = useRef('');
    const inputRef = useRef();
    const datas = useContext(infoUser);
    const route = useRoute();
    const {user,users} = route.params


    let [messages,setMessages] = useState('');
    let [text,setText] = useState([])
    

    useEffect(() => {
        createRoomIfNotExist();


        return ;
    },[])

    let getRoomId = (idpengirim,idpenerima) => {
        const sortedIds = [idpengirim,idpenerima].sort();
        const roomId = sortedIds.join('-');
        return roomId
    }
    
    function createRoomIfNotExist(){
        
        

        let roomId = getRoomId(user.id,users.userId);
        firestore()
            .collection('Rooms')
            .doc(roomId)
            .set({
                roomId: roomId,
                createdAt : Timestamp.fromDate(new Date())
            })
            .then(() => {
            });
        
    }


    const handleChange = (text) => {
        textRef.current = text;
        setMessages(textRef.current)

    }

    const handleSend = () => { 

        let encryptMessage = CryptoJS.AES.encrypt(messages, 'secret key 123').toString();
        let roomId = getRoomId(user.id,users.userId);
        firestore().collection('Rooms').doc(roomId).collection('Messages')
        .add({
            messages : encryptMessage,
            senderId : user.id,
            createdAt : firestore.Timestamp.now()
        }).then(()=> console.log("success"))
        if(inputRef){
            inputRef?.current?.clear();
        }
    }


    

    useEffect(()=>{
        let roomId = getRoomId(user.id,users.userId);

        const unsubscribe = firestore()
        .collection('Rooms')
        .doc(roomId)
        .collection('Messages')
        .orderBy('createdAt','asc')
        .onSnapshot(querySnapshot => {

            let data = []

            querySnapshot.forEach(documentSnapshot => {
                //console.log('Data:', documentSnapshot.data());
                data.push(documentSnapshot.data())
            });
            setText(data);
            console.log("datas : " , data);
            console.log("text : ",data);
            
        });
        return () => unsubscribe();

    },[])
    
  return (
    <View style={{flex : 1}}>
      <View>
        <MessageHeader users={users} />
      </View>
      <ScrollView>
      <View style={{flex : 1, rowGap : 5 , marginBottom : 10, marginTop : 10}}>
        {text.map((texts,index)=>{
            return (<MessageList key={index} texts={texts} user={user}/>)
        })}
      </View>
      </ScrollView>
      <View style={{backgroundColor : "white", 
      flexDirection : "row", 
      alignItems : "center",
      borderRadius : 20,
      marginHorizontal : 10,
      marginVertical : 5
      }}>
        
        <View style={{flex : 1, marginLeft : 15}}>
        <TextInput placeholder='Tuliskan .....' onChangeText={handleChange}  ref={inputRef} style={{color : "black"}}/>
        </View>
        <View>
        <Icon
            raised
            name='heartbeat'
            type='font-awesome'
            color='#f50'
            onPress={handleSend} 
            size={15}/>
        </View>
      </View>
    </View>
  )
}