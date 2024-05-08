import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from './LoginPage'
import Dummy from './Dummy'
import Other from './Other'
import ChatRoom from './ChatRoom'
import ChatItem from './ChatItem'
import { useContext } from 'react'
import { createContext } from 'react'


export const ThemeContext = createContext()

export default function App() {

  

  const Stack = createNativeStackNavigator()

  const info = [1,2,3,4]

  return (
    <NavigationContainer>
      <ThemeContext.Provider value={info} >
      <Stack.Navigator initialRouteName='LoginPage' screenOptions={{headerShown : false}}>
        <Stack.Screen name="Other" component={Other} />
        <Stack.Screen name="Dummy" component={Dummy} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ title : ''}}/>
        <Stack.Screen name="ChatItem" component={ChatItem}  />
      </Stack.Navigator>
      </ThemeContext.Provider>
    </NavigationContainer>
  )
}