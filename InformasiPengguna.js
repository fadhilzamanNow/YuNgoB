import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

export default function InformasiPengguna() {
  return (
    <View style={{flex : 1}}>
        <View style={{justifyContent : "center", alignItems : "center", marginTop : 50}}>
            <Image 
            source={require('./assets/images/H1A021066.jpeg')}
            style={{height : 250, width : 250, borderRadius : 9999}}
            />

        </View>
        <View style={{marginTop : 30}}>
            <Text style={{fontSize : 26, textAlign : "center", fontWeight : 600, color : "black"}}>Muhammad Ilham Isfadhillah</Text>
        </View>
        <View>
            <Text style={{textAlign : "center", fontSize : 16}}>H1A021066</Text>
        </View>

        
    </View>
  )
}