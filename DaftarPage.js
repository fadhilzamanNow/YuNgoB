import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth';
import { useRef } from 'react';
import firestore from '@react-native-firebase/firestore';



const DaftarPage = () => {

    const navigation = useNavigation()


    const emailRef = useRef('')
    const passwordRef = useRef('')
    const userRef = useRef('');
    const profileRef = useRef('');
    const inputEmail = useRef();
    const inputUser = useRef();
    const inputPass = useRef();
    const inputProf = useRef();
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [userreg,setUserReg] = useState('')
    const [profile,setProfile] = useState('')

    const handleEmail = (text) => {
        emailRef.current = text
        setEmail(emailRef.current)
    }

    const handlePassword = (text) => {
        passwordRef.current = text
        setPassword(passwordRef.current)
    }

    const handleUserReg = (text) => {
        userRef.current = text
        setUserReg(userRef.current)
    }

    const handleProfile = (text) => {
        profileRef.current = text
        setProfile(profileRef.current)
    }
    
    const buatAkun = (email,user,password,profileUrl)=> {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

            const userId = userCredential.user.uid
            firestore().collection('Users').doc(userId).set({
                email : email,
                name : user,
                profileUrl : profileUrl,
                userId : userId
            })
            
            Alert.alert('Sukses','Selamat, Akun berhasil dibuat');
            setTimeout(()=> {
                navigation.navigate('LoginPage');
            },1000)
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
            Alert.alert("Gagal","Maaf Email Telah Digunakan")
            }

            if (error.code === 'auth/invalid-email') {
            Alert.alert("Gagal","Maaf Email yang Digunakan Tidak Valid")
            }

            console.error(error);
        });

    

        console.log("email :" , email);
        console.log("user : ",user);
        console.log("password :", password);
        console.log("profileUrl : ",profileUrl)
    }

    const daftar = () => {
        buatAkun(email,userreg,password,profile);
        if(inputEmail || inputPass || inputProf || inputUser){
            inputEmail?.current?.clear();
            inputPass?.current?.clear();
            inputProf?.current?.clear();
            inputUser?.current?.clear();
        }
    }
  return (
    <SafeAreaView style={{backgroundColor : "white", flex : 1}}>
              <StatusBar barStyle="dark-content" backgroundColor="white" />
    <ScrollView>
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
            <View style={{borderWidth : 1, borderRadius : 10, flexDirection : "row", alignItems : "center", columnGap : 5, borderColor : "lightgray"}}>
                <View style={{marginLeft : 5}}>
                    <MaterialCommunityIcons name='email-edit-outline' size={32} color="lightgray" />
                </View>
                <TextInput placeholder="Email" style={{flex : 1}} onChangeText={handleEmail} ref={inputEmail}/>
            </View>
            <View style={{borderWidth : 1, borderRadius : 10, flexDirection : "row", alignItems : "center", columnGap : 5, borderColor : "lightgray"}}>
            <View style={{marginLeft : 5}}>
                    <Feather name='user' size={32} color="lightgray" />
                </View>
                <TextInput placeholder="Username" style={{flex : 1}} onChangeText={handleUserReg} ref={inputUser}/>
            </View>
            <View style={{borderWidth : 1, borderRadius : 10, flexDirection : "row", alignItems : "center", columnGap : 5, borderColor : "lightgray"}}>
                <View style={{marginLeft : 5}}>
                    <Feather name='key' size={32} color="lightgray" />
                </View>
                <TextInput placeholder="Password" style={{flex : 1}} onChangeText={handlePassword} ref={inputPass} secureTextEntry/>
            </View>
            <View style={{borderWidth : 1, borderRadius : 10, flexDirection : "row", alignItems : "center", columnGap : 5, borderColor : "lightgray"}}>
                <View style={{marginLeft : 5}}>
                    <AntDesign name='picture' size={32} color="lightgray" />
                </View>
                <TextInput placeholder="profileUrl" style={{flex : 1}} onChangeText={handleProfile} ref={inputProf} />
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
            <TouchableOpacity onPress={daftar}>

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
            </TouchableOpacity>
        </View>

        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default DaftarPage