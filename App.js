import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, StatusBar, SafeAreaView } from 'react-native';

import BluetoothStatus from './components/BluetoothStatus';
import BluetoothManager from './components/BluetoothManager';
import AudioToDecible from './components/AudioToDecible';

export default function App() {
  return (
    <>
      <AudioToDecible />
      <BluetoothStatus />
      <BluetoothManager/>
    </>  
  );
}

