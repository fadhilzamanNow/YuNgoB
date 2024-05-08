import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useContext } from 'react';
import { infoUser } from './ChatItem';
import firestore from "@react-native-firebase/firestore"
import { Timestamp } from 'firebase/firestore';
import { Icon } from 'react-native-elements';
import { useRef } from 'react';
import { Button } from 'react-native';


export default function ChatRoom() {

    const textRef = useRef('');
    
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
        let roomId = getRoomId(user.id,users.userId);
        firestore().collection('Rooms').doc(roomId).collection('Messages')
        .add({
            messages : messages,
            senderId : user.id,
            createdAt : firestore.Timestamp.now()
        }).then(()=> console.log("success"))
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
      <Text>{users.name}</Text>
      <View>
        {text.map((texts,index)=>{
            return <Text key={index}>{texts.messages}</Text>
        })}
      </View>
      <View style={{backgroundColor : "gray" , flexDirection : "row", alignItems : "center"
      }}>
        <View style={{flex : 1}}>
        <TextInput placeholder='tuliskan' onChangeText={handleChange} />
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