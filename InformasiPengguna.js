import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

export default function InformasiPengguna() {
  return (
    <ScrollView>
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
        <View>
            <Text style={{textAlign : "justify" , marginVertical : 10, marginHorizontal : 10}}>
            Komunikasi merupakan hal yang sangat penting dalam proses berinteraksi dari 
            seseorang ke sesesorang. Dengan melakukan komunikasi yang baik, sesuatu tujuan ataupun 
            pekerjaan yang melibatkan lebih dari satu orang dapat diselesaikan dengan baik. Di era modern 
            ini dengan berbagai macam keadaan, seperti pekerjaan yang semakin kompleks, kebutuhan 
            untuk kolaborasi, dan meningkatnya pengguna smartphone menimbulkan permintaan untuk 
            menciptakan perantara komunikasi antara seseorang yang tidak mengenal jarak dan waktu. 
            Dengan berkembangnya teknologi internet di zaman sekarang, maka pembuatan perantara 
            komunikasi yang dapat membuat seseorang berkomunikasi dengan mengirimkan pesan kepada 
            orang lain tanpa batas jarak dan waktu mungkin untuk dilakukan. Sayangnya, solusi 
            komunikasi tradisional seperti SMS dan panggilan telepon memiliki keterbatasan. SMS tidak 
            memungkinkan komunikasi real-time dan memiliki batasan karakter, sedangkan panggilan 
            telepon bisa memakan waktu dan biaya yang cukup besar. Aplikasi chat hadir sebagai solusi 
            yang lebih efektif dan efisien. Pengguna dapat bertukar pesan teks kepada seseorang secara 
            real-time dengan mudah dan tanpa batas jarak hanya dengan mengandalkan keterhubungan 
            dengan internet. 
            </Text>
            <Text style={{textAlign : "justify" , marginVertical : 20, marginHorizontal : 10}} >
            Aplikasi chat ini ditujukan untuk semua orang yang ingin berkomunikasi dengan 
            mudah dan efisien, tanpa terhalang jarak dan waktu. Kemampuannya untuk menyediakan 
            komunikasi real-time tanpa batas jarak menjadikannya alat yang penting, diantaranya untuk 
            masyarakat yang dapat digunakan untuk bertukar berita, ide, dan informasi penting dengan 
            mudah dan juga terhubung dengan keluarga, teman, dan kolega di mana pun mereka berada. 
            Lalu juga untuk pelajar untuk berkomunikasi dengan teman sekelas, bertukar informasi 
            pelajaran, dan berkolaborasi dalam proyek. Dan berbagai kelompok lain yang membutuhkan 
            kolaborasi tim , pertukaran ide/informasi dan koordinasi jarak jauh. Dengan demikian, dapat 
            disimpulkan bahwa aplikasi chat memiliki dampak yang luas dan beragam dalam memenuhi 
            kebutuhan komunikasi dan interaksi sosial bagi masyarakat, pelajar, dan berbagai kelompok 
            yang membutuhkan akses yang cepat dan efisien dalam berkomunikasi.
            </Text>
        </View>
        <View style={{flexDirection : "row", justifyContent : "space-around"}}>
            <Image 
                source={require('./assets/images/firebase_storage.png')}
                style={{height : 100, width : 100, borderRadius : 9999}}
                resizeMode="contain"
            />
            <Image 
                source={require('./assets/images/react_native.png')}
                style={{height : 100, width : 100, borderRadius : 9999}}
                resizeMode="contain"
            />
            <Image 
                source={require('./assets/images/firestore.png')}
                style={{height : 100, width : 100, borderRadius : 9999}}
                resizeMode="contain"
            />
        </View>
        
    </View>
    </ScrollView>
  )
}