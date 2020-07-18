import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, StatusBar, SafeAreaView, Alert } from 'react-native';

import AudioToDecible from './components/AudioToDecible';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import BluetoothA2DP from './components/BluetoothA2DP';
import BluetoothDevice from './components/BluetoothDevice';
import BluetoothController from './components/BluetoothController';
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js'; 

const spyFunction = (msg) => { 
  console.log("spy on bridge:", msg);
}; 

MessageQueue.spy(spyFunction);

export default function App() {

  const [devices,setDevices] = useState([]);
  const [bluetoothStatus, setBluetoothStatus] = useState(false);

  const addDevicesHandler = (deviceList) => {
    console.log("Device List"+deviceList);
    if(deviceList.length > 0){
      setDevices(deviceList);
      //uniqueDevices();
    }
  }

  const addDeviceHandler = (device) => {
    console.log("Adding device "+device);
    //let deviceList = [...devices,device];
    setDevices ( devices => [
      ...devices,device
    ]);
    //uniqueDevices();
  }

  const uniqueDevices = () => {
    console.log("Before filter: "+devices);
     let x = (devices) => (devices).filter((index,device) =>
        devices.indexOf(index) === device && device != null
     );
     setDevices(x);
     console.log("After filter: "+devices);
  }

  const bluetoothHandler = (status) => {
    console.log("Bluetooth Status: "+status);
    setBluetoothStatus(status);
  }

  return (
    <View>
      <AudioToDecible />
      <BluetoothController onPress={bluetoothHandler}/>
      <BluetoothA2DP visible={bluetoothStatus} addDevices={addDevicesHandler} addDevice={addDeviceHandler}/>
      <FlatList
        keyExtractor={(item, index)=>item.id}
        data={devices}
        renderItem={ itemData => (
          <BluetoothDevice
            id={itemData.item.id}
            title={itemData.item.name}
          />
        )}
      />  
    </View> 
  );
}


const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
        'Unexpected error occurred',
        `Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
        We have reported this to our team ! Please close the app and start again!`,
      [{text: 'Close'}]
    );
  }
  console.log('setJSExceptionHandler '+e); // So that we can see it in the ADB logs in case of Android if needed  
};

setJSExceptionHandler(errorHandler, true);

setNativeExceptionHandler((errorString) => {
    console.log('setNativeExceptionHandler '+errorString);
});