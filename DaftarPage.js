import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const DaftarPage = () => {

    const navigation = useNavigation()
  return (
    <SafeAreaView style={{backgroundColor : "white", flex : 1}}>
        <StatusBar barStyle="light-content" backgroundColor="white"  />

        <View style={{flex : 1, alignItems : "center"}}>
        <View style={{
            marginTop : 70,
            marginBottom : 20
        }}>
            <Image 
                source={(require('./assets/images/registration.jpg'))}
                style={{height : 200, width : 350}}
            />
        </View>
        <View style={{alignItems : "center", marginTop : 32, marginBottom : 32}}>
            <Text style={{
                color : "black",
                fontSize : 32,
                fontWeight : "bold"
            }}>Yuk Gabung dengan</Text>
            <Text style={{
                color : "red",
                fontSize : 48,
                fontWeight : "bold"
            }}>YuNgoB</Text>
        </View>
        <View style={{width : "80%", rowGap : 10}}>
            <View style={{borderWidth : 1, borderRadius : 10}}>
                <TextInput placeholder="Email"/>
            </View>
            <View style={{borderWidth : 1, borderRadius : 10}}>
                <TextInput placeholder="Username"/>
            </View>
            <View style={{borderWidth : 1, borderRadius : 10}}>
                <TextInput placeholder="Password"/>
            </View>
            <View style={{borderWidth : 1, borderRadius : 10}}>
                <TextInput placeholder="profileUrl"/>
            </View>
            <View style={{alignItems : "center"}}>
                <View style={{flexDirection : "row"}}>
                    <Text>Sudah Memiliki Akun?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} >
                    <Text style={{
                        color : "red"
                    }}> Login</Text>
                    </TouchableOpacity>
                </View>
            
            </View>
            <View style={{
                alignItems : "center", 
                width : "100%", 
                borderRadius : 10, 
                height : 50,
                justifyContent : "center",
                backgroundColor : "red"
                }}>
                <Text style={{
                    fontSize : 24,
                    fontWeight : "bold",
                    color : "white"
                }}>Daftar</Text>
            </View>
        </View>

        </View>
    </SafeAreaView>
  )
}

export default DaftarPage