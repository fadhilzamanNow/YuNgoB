import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import FriendListDetails from './FriendListDetails'

export function AddFriendList({filterUser, user}) {
    console.log(filterUser[0])
    
  return (
    <View style={{borderWidth : 1, borderRadius : 5, marginHorizontal : 20, padding : 40}}>
        {filterUser[0] ? (<FriendListDetails info={filterUser[0]} user={user}/>)
         : null}
    </View>
  )
}