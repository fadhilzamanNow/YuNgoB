import { View, Text, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Home from './Home';





export default function App() {

  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState();
  const [isAuthenticated,setIsAuthenticated] = useState(false);


  

  async function onGoogleButtonPress() {

    try{
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken, user} = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    
    await sendDocument(user).then(()=> console.log("selesai"))
    setUser(user);
    setIsAuthenticated(true)
    return auth().signInWithCredential(googleCredential);
    }
    catch(e){
      console.log("gagal masuk karena:", e)
    }
  }

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '371395645741-v2o8p6k9m9pel096bpt61e27280d6qel.apps.googleusercontent.com',
    });

  },[])

  const sendDocument = async (nama) => {
    try {
      const userRef = firestore().collection('Users').doc(nama.id);
      const doc = await userRef.get();
  
      if (doc.exists) {
        console.log('User already exists in Firestore');
        return; // User document already exists, no need to create a new one
      }
  
      // User document doesn't exist, create a new one
      await userRef.set({
        name: nama.givenName,
        email: nama.email,
        profileUrl: nama.photo,
        userId: nama.id
      });
  
      console.log('User added to Firestore!');
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    }
  };

  let signOut = async () => {
    try {
      await GoogleSignin.signOut().then(()=>console.log("berhasil keluar"))
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <View style={{flex : 1}}>
      {isAuthenticated ? (<Home user={user} setIsAuthenticated={setIsAuthenticated}/>) : (
      <View style={{flex : 1, flexDirection: "column", alignItems : "center", backgroundColor : "white"}}>
     <View style={{backgroundColor : "white", width : "100%", height : "50%", alignItems : "center"}}>
        <Image
          source={(require('./assets/images/talk.jpg'))}
          style={{height : "100%",width : "100%"}}
          resizeMode="contain"
          
        />
      </View>
      <View style={{flexDirection : "column" , "justifyContent" : "center", alignItems : "center"}}>
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
      <View style={{marginTop : 150}}>
      <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.White}
          onPress={onGoogleButtonPress}
        />
      </View>      
    </View>
  )}
    
    </View>
  )
}