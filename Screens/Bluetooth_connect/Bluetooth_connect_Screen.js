
import React, { Component, Promise } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  AppState,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';
import Permissions from 'react-native-permissions';
import { BluetoothStatus } from 'react-native-bluetooth-status'
import RNBluetoothClassic from 'react-native-bluetooth-classic';

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
      bluetoothState: '',
      appState: AppState.currentState,
      oprMessage: 'Bluetooth is On',
      devices: [],
      showBluetoothOnOff : false
    };
  };

  scan = async () => {
    this.setState({ oprMessage: 'Scanning Fountains...'});
    console.log("Scanning devices");
    try {
        await RNBluetoothClassic.discoverDevices().then((deviceList) => {
            console.log("Scanning completed. Devices : ", deviceList);
            this.setState({ devices: deviceList});
        }).catch( (error) => {
            console.log("Error in Scanning devices Error "+error);
        });
    } catch (error) {
        console.log("Error scanning devices: "+error);
    }
  }
  async Go_Select_Fountain_Screen() {
    await this.scan();
    this.props.navigation.navigate('Select_Fountain_Screen', { devices: this.state.devices})
  }
  async Go_Bluetooth_Connect() {
    await this.turnOnBluetooth();
    setTimeout(async () => {
      await this.checkBluetoothState();
      this.Go_Select_Fountain_Screen();
    }, 2000);
  }
  requestBluetoothAuthorization = async () => {
    if (Platform.OS === 'android') {
      const p = await Permissions.request(Permissions.PERMISSIONS.ANDROID.BLUETOOTH_ADMIN);
      console.log('bluetooth permission request', p);
      return p;
    }
  }

  checkBluetoothAuthorizationStatus = async () => {
    if (Platform.OS === 'android') {
      const p = await Permissions.check(Permissions.PERMISSIONS.ANDROID.BLUETOOTH_ADMIN);
      console.log('bluetooth admin permission check', p);
      if (p === Permissions.RESULTS.GRANTED) {      
        return p;
      }
      return this.requestBluetoothAuthorization();
    }
  }

  requestLocationPermissionStatus = async () => {
    if (Platform.OS === 'android') {
      const p = await Permissions.request(Permissions.PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
      console.log('bluetooth location permission request', p);
      return p;
    }
  }

  checkLocationPermissionStatus = async () => {
    if (Platform.OS === 'android') {
      const p = await Permissions.check(Permissions.PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
      console.log('bluetooth location permission check', p);
      if (p === Permissions.RESULTS.GRANTED) {      
        return p;
      }
      return this.requestLocationPermissionStatus();
    }
  }

  async componentDidMount() {
    await this.checkLocationPermissionStatus();
    await this.checkBluetoothAuthorizationStatus();
    if(this.ios()){
      AppState.addEventListener('change', (nextAppState) => this._handleAppStateChange(nextAppState));
    }
    await this.checkInitialBluetoothState();
    console.log('Bluetooth is '+this.state.bluetoothState);
    if (!(this.ios()) &&  this.state.bluetoothState === 'On'){
      this.Go_Select_Fountain_Screen();
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if(this.ios()){
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        this.updateBluetoothStatus();
      }
      this.setState({ appState: nextAppState });
    }
  };

   updateBluetoothStatus = async () => {
    if(this.ios()){
    return new Promise(async (resolve, reject) => {
        try {
          const isEnabled = await BluetoothStatus.state();
          this.setState({ bluetoothState: (isEnabled) ? 'On' : 'Off', showBluetoothOnOff : isEnabled});
          resolve(isEnabled);
        } catch (error) { reject(error) }
      });
    }
  }

  checkInitialBluetoothState = async () => {
    if(this.ios()){
      const isEnabled = await this.updateBluetoothStatus();
      if (!isEnabled) {
        this.requireBluetooth();
      }
    }else{
      const isEnabled = await BluetoothStatus.state();
      this.setState({ bluetoothState: (isEnabled) ? 'On' : 'Off', showBluetoothOnOff : isEnabled});
    }
  }

  requireBluetooth = () => {
    if(this.ios()){
      console.log("Open bluetooth setting");
    }
  }

  ios = () => {
    return Platform.OS === 'ios';
  }

  async turnOnBluetooth() {
    if(!this.ios()){
      try {
        console.log('Turning on Bluetooth');
        await BluetoothStatus.enable();
      } catch (error) { console.error(error); }
    }
  }

  async checkBluetoothState() {
    if(!this.ios()){
      try {
        const isEnabled = await BluetoothStatus.state();
        console.log('Bluetooth status ', isEnabled)
        this.setState({ bluetoothState: (isEnabled) ? 'On' : 'Off', showBluetoothOnOff : isEnabled});
      } catch (error) { console.error(error); }
    }
  }

  render() {

    return (
      <View style={Styles.container}>
        <ImageBackground style={Styles.Main_Back} source={require(I_BackgroundImage)} >
          <View style={Styles.Main_View} >
            <ImageBackground style={Styles.Main_ImgView} source={require(I_RoundedBG)} >
              {!(this.ios()) && !this.state.showBluetoothOnOff && 
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
              }{ !(this.ios()) && this.state.showBluetoothOnOff &&
              <View style={Styles.View_One} >
                <View >
                  <View style={Styles.View_Two}>
                    <Image style={{ alignSelf: 'center' }} source={require(I_Bluetooth)}></Image>
                  </View>
                </View>
                <View style={Styles.View_Three}>
                  <Text style={Styles.txtBluetooth}>{this.state.oprMessage}</Text>
                </View>
              </View>
              }
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