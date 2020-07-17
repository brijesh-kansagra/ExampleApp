import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  Platform,
  AppState
} from 'react-native';
import Permissions from 'react-native-permissions';
import { BluetoothStatus } from 'react-native-bluetooth-status'

export default class BluetoothController extends Component {

  requestBluetoothAuthorization = async () => {
    if (Platform.OS === 'android') {
      const p = await Permissions.request(Permissions.PERMISSIONS.ANDROID.BLUETOOTH_ADMIN);
      console.log('bluetooth permission request', p);
      return p;
    }
  }

  checkBluetoothAuthorizationStatus = async () => {
    if (Platform.OS === 'android') {
      const p = await Permissions.request(Permissions.PERMISSIONS.ANDROID.BLUETOOTH_ADMIN);
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
      const p = await Permissions.request(Permissions.PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
      console.log('bluetooth location permission check', p);
      if (p === Permissions.RESULTS.GRANTED) {      
        return p;
      }
      return this.requestLocationPermissionStatus();
    }
  }

  componentDidMount() {
    this.checkLocationPermissionStatus();
    this.checkBluetoothAuthorizationStatus();
    if(this.ios()){
      AppState.addEventListener('change', (nextAppState) => this._handleAppStateChange(nextAppState));
    }
    this.checkInitialBluetoothState();
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
          this.setState({ bluetoothState: (isEnabled) ? 'On' : 'Off'});
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
      this.setState({ bluetoothState: (isEnabled) ? 'On' : 'Off'});
    }
  }

  requireBluetooth = () => {
    if(this.ios()){
      console.log("Open bluetooth setting");
    }
  }

  state = {
    bluetoothState: '',
    appState: AppState.currentState
  };

  ios = () => {
    return Platform.OS === 'ios';
  }

  async toggleBluetooth() {
    if(!this.ios()){
      try {
        const isEnabled = await BluetoothStatus.state();
        BluetoothStatus.enable(!isEnabled);
        this.setState({ bluetoothState: (isEnabled) ? 'Off' : 'On'});
        this.props.onPress(!isEnabled);
      } catch (error) { console.error(error); }
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Button enable={!(this.ios())} onPress={() => this.toggleBluetooth()}
                  title={'Bluetooth is: ' + this.state.bluetoothState} />
          <Text enable={this.ios()} style={styles.instructions}>
            Bluetooth is: { this.state.bluetoothState }
          </Text>                  
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

