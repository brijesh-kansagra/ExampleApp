/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  StatusBar
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import RNSoundLevel from 'react-native-sound-level';

const App: () => React$Node = () => {
  
  const start = async (e) => {
    console.log('starting..');

    RNSoundLevel.start()
    RNSoundLevel.onNewFrame = (data) => {
      console.log('Sound level ', data)
    }
    e.target;
    setTimeout(async () => {
      console.log('stopping ..');
      RNSoundLevel.stop()
    }, 5000)
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Button onPress={start} title="Start"/>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  }
});

export default App;
