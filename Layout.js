import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home';
import Dummy from './Dummy';
import Dummy2 from './Dummy2';

const Tab = createBottomTabNavigator();

const Layout = ({user,signOut}) => {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Dummy' component={Dummy} options={{title : 'YuNgoB', tabBarLabelStyle : {color : 'green'}, headerTitleStyle : {color : "white"}, 
        headerStyle  :{
            backgroundColor : "red",
        }
    }} initialParams={{user : user, signOut : signOut}} />
        <Tab.Screen name='Dummy2' component={Dummy2} />
        <Tab.Screen name='Home' component={Home} initialParams={{user : user, signOut : signOut}}/>
    </Tab.Navigator>
  )
}

export default Layout