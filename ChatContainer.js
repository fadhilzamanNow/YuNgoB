import { View, Text } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'

export const ChatContainer = ({users,user}) => {
  return (
    <View>
      {users.map((users,index)=> {
        return <ChatItem users={users} key={index} user={user}/>
      })}
    </View>
  )
}

