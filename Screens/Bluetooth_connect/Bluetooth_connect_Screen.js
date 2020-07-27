
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
import COLORS from '../../Resources/Colors';

import { Styles } from './Bluetooth_connect_Styles.js'
const I_BackgroundImage = '../../Images/Background/BackGroudSCR.png'
const I_RoundedBG = '../../Images/Rounded_BG_Shape/Rounded_BG_Shape.png'
const I_Logo_H = '../../Images/Logo_Himalaya/Logo_Himalaya.png'
const I_Bluetooth = '../../Images/Bluetooth/Bluetooth.png'
const I_RoundButton = '../../Images/RoundButton/RoundButton.png'
export default class Bluetooth_connect_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  };
  Go_Bluetooth_Connect() {
    this.props.navigation.navigate('Select_Fountain_Screen')
  }
  render() {

    return (
      <View style={Styles.container}>
        <ImageBackground style={Styles.Main_Back} source={require(I_BackgroundImage)} >
          <View style={Styles.Main_View} >
            <ImageBackground style={Styles.Main_ImgView} source={require(I_RoundedBG)} >
              <View style={Styles.View_One}>
                <View >
                  <View style={Styles.View_Two}>
                    <Image style={{ alignSelf: 'center' }} source={require(I_Bluetooth)}></Image>
                  </View>
                </View>
                <View style={Styles.View_Three}>
                  <Text style={Styles.txtBluetooth}>Turn On Bluetooth</Text>
                  <Text style={Styles.txtDesc}>Bluetooth must be on at all times to track your fountain</Text>
                </View>
                <View style={Styles.View_TurnOn}>
                  <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.Go_Bluetooth_Connect()}>
                    <ImageBackground style={Styles.img_TurnOn} source={require(I_RoundButton)}>
                      <View>
                        <Text style={Styles.txtTurnOn}>TURN ON</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
              
            </ImageBackground>
          </View>
          <View style={Styles.View_Fifth}>
            <Image style = {{alignSelf:'center'}} source={require(I_Logo_H)} />
          </View>
          <View style={Styles.View_Bottom}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={Styles.txtBy}>By</Text>
              <Text style={Styles.txtBottom}> Himalaya Music Fountain </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});