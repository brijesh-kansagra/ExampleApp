import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, StatusBar, SafeAreaView, Alert, ImagePropTypes } from 'react-native';

import AudioToDecible from './components/AudioToDecible';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import BluetoothA2DP from './components/BluetoothA2DP';
import BluetoothDevice from './components/BluetoothDevice';
import BluetoothController from './components/BluetoothController';
import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js'; 
import Spinner from 'react-native-loading-spinner-overlay';

const spyFunction = (msg) => { 
  console.log("spy on bridge:", msg);
}; 

MessageQueue.spy(spyFunction);

export default function App() {


  const [enableSpinner,setEnableSpinner] = useState(false);

  const [devices,setDevices] = useState([]);
  const [bluetoothStatus, setBluetoothStatus] = useState(false);

  const addDevicesHandler = (deviceList) => {
    console.log("Device List "+deviceList);    
    if(deviceList.length > 0){

      if(devices.length > 0){
        setDevices(Array.from(uniqueDevices([...devices,...deviceList])));
        console.log("AddDeviceSHandler devices length > 0"+devices);
      }else{
        setDevices(Array.from(uniqueDevices([...deviceList])));
        console.log("AddDeviceSHandler devices length = 0"+devices);
      }
    }
    console.log("After filter, devices: "+devices);
  }

  const addDeviceHandler = (device) => {
    console.log("Adding device "+device);
    if(device!=null){
      if(devices.length > 0){
        setDevices(Array.from(uniqueDevices([...devices,device])));
        console.log("AddDeviceHandler devices length > 0"+devices);
      }else{
        let x = new Array(device);
        setDevices(x);
        console.log("AddDeviceHandler devices length = 0"+devices);
      }
      console.log("After filter, devices: "+devices);
    }
  }

  const uniqueDevices = (deviceList) => {
    let mymap = new Map(); 
    deviceList.filter(el => { 
    const val = mymap.get(el.id); 
    if(val) { 
        if(el.id < val) { 
          console.log("Removing element "+el.id);
          mymap.delete(el.id); 
          mymap.set(el.id, el); 
          console.log("Adding element "+el.id);
            return true; 
        } else { 
            return false; 
        } 
    } 
    mymap.set(el.id, el);
    return true;
  });
  console.log("Final list: "+mymap.values());
  return mymap.values();
}

  const bluetoothHandler = (status) => {
    console.log("Bluetooth Status: "+status);
    setBluetoothStatus(status);
  }

  const scanDevicesHandler = (text) => {
    setEnableSpinner(true);
    setInterval(() => {
      setEnableSpinner(false);
    },12000);
  }

  return (
    <View>
      <AudioToDecible />
      <BluetoothController onPress={bluetoothHandler}/>
      <Spinner
            visible={enableSpinner}
            textContent='Scanning Devices...'
      />
      <BluetoothA2DP visible={bluetoothStatus} scanDevices={scanDevicesHandler} addDevices={addDevicesHandler} addDevice={addDeviceHandler}/>
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