import { View, Text } from 'react-native'
import React, { useEffect, useState} from 'react'
import FriendListDetails from './FriendListDetails'
import firestore from "@react-native-firebase/firestore"

export function AddFriendList({filterUser, user}) {

  const [request,setRequest] = useState(false);
 
  

    
    
  return (
    <View style={{borderWidth : 1, borderRadius : 5, marginHorizontal : 20, padding : 40, borderColor : "lightgray"}}>
        {filterUser[0] ? (<FriendListDetails info={filterUser[0]} user={user}/>)
         : null}
    </View>
  )
}