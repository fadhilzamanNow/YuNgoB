import { View, Text, ActivityIndicator, Image, Alert, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Home from './Home';
import { useNavigation } from '@react-navigation/native';
import Fontisto from "react-native-vector-icons/Fontisto"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import { useRef } from 'react';
import "firebase/auth"
import Layout from './Layout';




export default function LoginPage() {

  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('')
  const [inData,setInData] = useState();

  const emailRef = useRef();
  const passRef = useRef();

  const inputEmail = useRef();
  const inputPass = useRef();

  const navigation = useNavigation();
  

  async function onGoogleButtonPress() {

    try{
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken, user} = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    
    await sendDocument(user)
    await takeData(user)

    return auth().signInWithCredential(googleCredential);
    }
    catch(e){
      Alert.alert('error',e.message)
    }
  }

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '371395645741-v2o8p6k9m9pel096bpt61e27280d6qel.apps.googleusercontent.com',
    });
  },[])

  useEffect(() => {
    if(inData) {
      setIsAuthenticated(true)
      console.log("use Effect Data", inData)
    }
  },[inData])

  
  const takeData = async (users) => {
    firestore().collection('Users').doc(users.id).get().then((data) => {
      setUser(data.data())
      return {success : true};
    }).then((success) => {
      setIsAuthenticated(user)
    })

  }
  const sendDocument = async (nama) => {
    try {
      const userRef = firestore().collection('Users').doc(nama.id);
      const doc = await userRef.get();
  
      if (doc.exists) {
        return; // User document already exists, no need to create a new one
      }
  
      // User document doesn't exist, create a new one
      await userRef.set({
        name: nama.givenName,
        email: nama.email,
        profileUrl: nama.photo,
        userId: nama.id
      });
  
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    }
  };

  let signOut = async () => {
    try {
      await GoogleSignin.signOut().then(() => setIsAuthenticated(false))
    } catch (error) {
      auth().signOut()
      console.error(error);
    }
  };


  const loginbiasa = async (emaillog,passwordlog) => {
    try{
      let userInfo = {}
      const emailId = await auth().signInWithEmailAndPassword(emaillog,passwordlog).then((data) => data.user.uid)
      await firestore().collection('Users').doc(emailId).get().then((data) => data._data).then(
        (data)=> {
          userInfo.email = data.email,
          userInfo.name = data.name,
          userInfo.photo = data.profileUrl,
          userInfo.id = data.userId

          return userInfo;
        }
      ).then((userInfo) =>{
        setUser(userInfo)
        return {success : true}
      }).then((success) => {
        if(success) setIsAuthenticated(true) 
      }).then(() => {
        console.log("berhasil masuk : ", user)
      })
    
        
    }catch(e){
      Alert.alert("Gagal",e.message)
    }
  }

  const emaillogin = () => {
    loginbiasa(email,pass)
  }
  
  const handleEmail = (text) => {
    emailRef.current = text
    setEmail(emailRef.current)
  }

  const handlePass = (text) => {
    passRef.current = text 
    setPass(passRef.current)

  }
  return (
    <View style={{flex : 1, backgroundColor : "white"}}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {isAuthenticated ? (<Layout user={user} inData={inData} signOut={signOut}/>) : (
      <View style={{flex : 1, flexDirection: "column", alignItems : "center", backgroundColor : "white"}}>
            <View style={{backgroundColor : "white", width : "100%", height : "40%", alignItems : "center" }}>
                <Image
                  source={(require('./assets/images/talk.jpg'))}
                  style={{height : "100%",width : "100%"}}
                  resizeMode="contain"
                  
                />
              </View>

            <View style={{ flexDirection : "column" , "justifyContent" : "center", alignItems : "center", width: "80%", backgroundColor : "white"}}>
              <Text style={{
                fontSize : 32, 
                color : "black",
                fontWeight : "bold",
                }}>
                  Masuk
              </Text>
              <Text style={{
                fontSize : 48,
                color : "red",
                fontWeight : "bold"
              }}>
                YuNgoB
              </Text>
          </View>

          <View style={{ width : "80%", marginTop : 50}}>
            <View style={{flexDirection : "column", rowGap : 10}}>
              <View style={{borderWidth : 1, borderRadius : 10, borderColor : 'lightgray', backgroundColor : "white", flexDirection : "row", alignItems : "center", gap : 5}}>
              <View style={{marginLeft : 5}}>
              <Fontisto name="email" size={32} color="lightgray"  />
              </View>
              <TextInput placeholder='Email' style={{flex : 1}} ref={inputEmail} onChangeText={handleEmail} />
              </View>
              <View style={{borderWidth : 1, borderRadius : 10, borderColor : 'lightgray', backgroundColor : "white", flexDirection : "row", alignItems : "center", gap : 5}}>
                <View style={{marginLeft : 5}}>
                <FontAwesome6 name="unlock-keyhole" size={32} color="lightgray" />
                </View>
              <TextInput placeholder='Password' style={{flex :1}} ref={inputPass} onChangeText={handlePass} secureTextEntry />
              </View>
              <TouchableOpacity onPress={emaillogin}>
              <View style={{flexDirection : "row", justifyContent : "center", height : 50 , backgroundColor : "red", alignItems : "center", borderRadius : 10, marginTop : 20}}>
                <Text style={{color : "white", fontSize : 24, fontWeight : 700}}>Login</Text>
              </View>
              </TouchableOpacity>
              <View style={{flexDirection : "row", justifyContent : "center"}}>
                <Text>Belum memiliki akun?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('DaftarPage')}>
                <Text style={{color:"red"}}> Daftar</Text>
                </TouchableOpacity>
              </View>
            </View>


        <View style={{ flexDirection : "row", justifyContent : "center", alignItems : "center", columnGap : 10}}>
          <TouchableOpacity
          onPress={onGoogleButtonPress}
          >
          <Image 
            source={require('./assets/images/google.png')}
            style={{height : 60, width : 60, borderRadius : 10}}
          />
          </TouchableOpacity>
          
        </View>
       
        
      </View>      
    </View>
  )}
    </View>
  )
}