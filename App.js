import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, StatusBar, SafeAreaView, Alert } from 'react-native';

import BluetoothManager from './components/BluetoothManager';
import AudioToDecible from './components/AudioToDecible';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import BluetoothA2DP from './components/BluetoothA2DP';

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
        'Unexpected error occurred',
        `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}

        We have reported this to our team ! Please close the app and start again!
        `,
      [{
        text: 'Close'
      }]
    );
  }
  console.log('setJSExceptionHandler '+e); // So that we can see it in the ADB logs in case of Android if needed  
};

setJSExceptionHandler(errorHandler, true);

setNativeExceptionHandler((errorString) => {
    console.log('setNativeExceptionHandler '+errorString);
});

export default function App() {
  return (
    <>
      <AudioToDecible />
      <BluetoothA2DP />
    </>  
  );
}

