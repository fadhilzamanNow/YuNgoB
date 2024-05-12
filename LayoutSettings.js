import { View, Text } from 'react-native'
import React from 'react'
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Dummy from './Dummy';
import Dummy2 from './Dummy2';
import Settings from './Settings';
import Fontisto from "react-native-vector-icons/Fontisto"
import Pendings from './Pendings';
import InformasiPengguna from './InformasiPengguna';


const Drawer = createDrawerNavigator();



export default function LayoutSettings({route}) {
    const {user,signOut} = route.params

  return (
    
      <Drawer.Navigator>
            
            <Drawer.Screen name="Settings" component={Settings} initialParams={{user : user, signOut : signOut}} options={{
                headerTitleAlign : "center",
                headerTitleStyle : {color : "black", fontWeight : 500},
                drawerActiveTintColor : "red",
                headerTintColor : "red",
                headerTitleStyle : {color : "red"}

                
            }} />
            <Drawer.Screen name="Friend Request" component={Pendings} initialParams={{user : user, signOut : signOut}} options={{
                headerTitleAlign : "center",
                headerTitleStyle : {color : "black", fontWeight : 500},
                drawerActiveTintColor : "red",
                headerTintColor : "red",
                headerTitleStyle : {color : "red"}
            }}
                
            />
            <Drawer.Screen name="Informasi Aplikasi" component={InformasiPengguna} options={{
                headerTintColor : "red",
                drawerActiveTintColor : "red",
                headerTitleAlign : "center"
            }}/>
      </Drawer.Navigator>
      
  )
}