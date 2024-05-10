import { View, Text } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'

export const ChatContainer = ({users,user,friends}) => {
    console.log("it my friends : ", friends)
  return (
    <View>
      {friends.map((friends,index)=> {
        return <ChatItem users={friends} key={index} user={user}/>
      })}
    </View>
  )
}

