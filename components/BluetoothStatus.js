import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';

var config = {
  "deviceName": "Bluetooth Example Project",
  "bufferSize": 1024,
  "characterDelimiter": "\n"
}

const init = () => {
  EasyBluetooth.init(config)
    .then(function (config) {
      console.log("config done!");
    })
    .catch(function (ex) {
      console.warn(ex);
  });
  console.log("Config is "+config);
}

const startScan = () => {
  EasyBluetooth.startScan()
  .then(function (devices) {
    console.log("all devices found:");
    console.log(devices);
  })
  .catch(function (ex) {
    console.warn(ex);
  });
  console.log("scanned devices");
}

const BluetoothStatus = () => {
  init();
  startScan();
  return (
    <View>
      <Text>Hello from BluetoothStatus!</Text>
    </View>
  );
}

export default BluetoothStatus;