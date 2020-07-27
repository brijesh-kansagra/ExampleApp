
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

import { Styles } from './Start_Record_Style.js';
import COLORS from '../../Resources/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const I_BackgroundImage = '../../Images/Background/BackGroudSCR.png'
const I_Heught_BG = '../../Images/RecordScreen/Heught_BG.png'
const I_Mic = '../../Images/RecordScreen/Mic.png'
const I_Round_BG = '../../Images/RecordScreen/Round_BG.png'
const I_Round_BG1 = '../../Images/RecordScreen/RoundBG1.png'

const I_SecondCount = '../../Images/RecordScreen/SecondCount.png'


export default class Start_Record_Screen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

  };
  Go_Score() {
    this.props.navigation.navigate('Start_Record_Screen')
  }
  render() {
    return (
      <View style={Styles.container}>
        <ImageBackground style={Styles.Main_Back} source={require(I_BackgroundImage)} >
          <View style={Styles.View_Header}>
            <View>
              <Image source={require(I_Heught_BG)}></Image>
              <View style={Styles.HeaderViewText}>
                <Text style={Styles.txtHeader}>Height</Text>
                <Text style={Styles.txtHeader1}>156CM</Text>
              </View>
            </View>
            <View>
              <Image source={require(I_Heught_BG)}></Image>
              <View style={Styles.HeaderViewText}>
                <Text style={Styles.txtHeader}>Frequency</Text>
                <Text style={Styles.txtHeader1}>+150DB</Text>
              </View>
            </View>
          </View>
          <View style={Styles.ViewCenter}>
            <View style={{backgroundColor:COLORS.red}}>
              <Text>TEXTTT</Text>
            </View>
            <View style={Styles.ViewSubCenter} >
              <View style ={{justifyContent:'center'}} >
                <Image style = {Styles.Img_SecBG }source={require(I_SecondCount)} /> 
                <Text style = {Styles.txtSEC}>30
                <Text style = {Styles.txtSEC1}> SEC</Text>
                </Text>

              </View>
              <View >
                <Image style = {Styles.imgMik}source={require(I_Mic)}></Image>
              </View>
            </View>
            <View style={{backgroundColor:COLORS.red ,}}>
              <Text>TEXTTT</Text>
            </View>
          </View>

          <View style={Styles.ViewBottom}>
            <Image style={Styles.imeBottom} source={require(I_Round_BG1)}></Image>
            <Text style={Styles.txtBottom}>START</Text>
          </View>
        </ImageBackground>
      </View>
    )

  }
}

