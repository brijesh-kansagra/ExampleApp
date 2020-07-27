
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';

import { Styles } from './Select_Fountain_Styles.js';
import COLORS from '../../Resources/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const I_BackgroundImage = '../../Images/Background/BackGroudSCR.png'
const I_RoundedBG = '../../Images/Rounded_BG_Shape/Rounded_BG_Shape.png'
const I_Logo_H = '../../Images/Logo_Himalaya/Logo_Himalaya.png'
const I_Logo_Splash = '../../Images/Colorfull_Splash/Colorfull_Splash.png'
const I_Fountain1 = '../../Images/Fountain1/Fountain1.png'
const I_Fountain2 = '../../Images/Fountain2/Fountain2.png'
const I_Fountain3 = '../../Images/Fountain3/Fountain3.png'
const I_Connect_Fountain = '../../Images/Connect_Fountain/Connect_Fountain.png'

export default class Select_Fountain_Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  };
  Go_Score() {
    this.props.navigation.navigate('Score_Screen')
  }
  render() {
    return (
      <View style={Styles.container}>
         <StatusBar barStyle="light-content" />
        <ImageBackground style={Styles.Main_Back} source={require(I_BackgroundImage)} >
          <ScrollView  contentContainerStyle={{ flexGrow: 1 }} scrollEnabled = {true} style={{ flex: 1}}>
            <View style={Styles.View_Main}>
              <View style={Styles.View_Header}>
                <Text style={Styles.txt_Header1}> Please Select
                <Text style={{ color: COLORS.red }}> Your Fountain </Text>
                </Text>
              </View>
              <View style={Styles.View_Splace}>
                <Image style={Styles.img_Splace} source={require(I_Logo_Splash)}></Image>
              </View>
              <View style={Styles.View_Main_Fountain}>
                <View style={Styles.View_Fountain}>
                  <Image source={require(I_Fountain1)}></Image>
                  <Text style={Styles.txt_Fountain_1_3}>Fountain 1</Text>
                </View>
                <View style={Styles.View_Fountain}>
                  <Image source={require(I_Fountain2)}></Image>
                  <Text style={Styles.txt_Fountain_2}>Fountain 2</Text>
                </View>
                <View style={Styles.View_Fountain}>
                  <ImageBackground style={Styles.img_Fountain3} source={require(I_Fountain3)}></ImageBackground>
                  <Text style={Styles.txt_Fountain_1_3}>Fountain 3</Text>
                  <Text style={Styles.txt_Fountain_3_Desc}>Occupied by other user</Text>

                </View>
              </View>
              <View style={Styles.View_Connect_Fountain}>
                <TouchableOpacity style ={{justifyContent:"center" , justifyContent:'center'}} onPress={() => this.Go_Score()}>
                  <Image source = {require(I_Connect_Fountain)}></Image>
                  <Text style = {Styles.txt_Conneect}>CONNECT TO FOUNTAIN</Text>
                </TouchableOpacity>
              </View>

              <View style={Styles.View_Bottom}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={Styles.txtBy}>By</Text>
                  <Text style={Styles.txtBottom}> Himalaya Music Fountain </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    )

  }
}

