import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home';
import Dummy from './Dummy';
import Dummy2 from './Dummy2';
import HomeHeader from './HomeHeader';
import Entypo from "react-native-vector-icons/Entypo"
import Fontisto from "react-native-vector-icons/Fontisto"

import Settings from './Settings';
import { AddFriend } from './AddFriend';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import LayoutSettings from './LayoutSettings';

const Tab = createBottomTabNavigator();

const Layout = ({user,signOut}) => {
  return (
    <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name='Home' component={Home} initialParams={{user : user, signOut : signOut}} options={{
            title : "YuNgoB",
            headerTitleStyle : {color : "red", fontWeight : 700},
            headerTitleAlign : "center",
            tabBarLabel : 'Home',
            tabBarIcon : ({focused,size,color}) => {
                return <Entypo name='home' size={size} color={color}/>
            },
            tabBarActiveTintColor : "red"
            
        }}
        
        />
        <Tab.Screen name='AddFriend' component={AddFriend} initialParams={{user : user}} 
        options={{
            title : "Add Friends",
            tabBarIcon : ({color,size}) => {
                return <FontAwesome5 name="user-friends" color={color} size={size} />
            },
            tabBarActiveTintColor : "red",
            headerTitleAlign : "center"
            
        }}  
        />
        <Tab.Screen name='LayoutSettings' component={LayoutSettings} initialParams={{user : user, signOut : signOut}} options={{
            headerShown : false,
            tabBarIcon : ({focused,color,size}) => {
                return <Fontisto name="player-settings" size={size} color={color}/>
            },
            tabBarActiveTintColor : "red",
            
        }} />
        
    </Tab.Navigator>
  )
}

export default Layout