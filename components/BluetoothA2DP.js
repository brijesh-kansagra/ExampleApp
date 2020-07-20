import React, {useEffect} from 'react';
import {View, Button, NativeEventEmitter, NativeModules, StyleSheet} from 'react-native';
import A2dp from 'react-native-a2dp';

const BluetoothA2DP = props => {

    const scan = async () => {
        console.log("Scanning devices");
        props.scanDevices();
        A2dp.scan().then( () => {
            console.log("Scanning completed");        
            console.log("Fetching device list");
            A2dp.deviceList().then( (deviceList) => {
                console.log("Devices: "+deviceList);
                props.addDevices(deviceList);
            }).catch( (error) => {
                console.log("Error fetching device list: "+error);
            });

        }).catch( (error) => {
            console.log("Error scanning devices: "+error);
        });        
    }

    const newDevice = (event)=>{
        props.addDevice(event);
        console.log('device added '+event);
    };

    useEffect(() => {
        // This gets called after every render, by default
        // (the first one, and every one after that)
        console.log("Mounting ");
        const { A2dp } = NativeModules.A2dp;
        const eventEmitter = new NativeEventEmitter(A2dp);
        this.eventListener = eventEmitter.addListener("device",newDevice);
    
        // If you want to implement componentWillUnmount,
        // return a function from here, and React will call
        // it prior to unmounting.
        return () => {
            this.eventListener.remove()
        }
      });
    
    return(
        <View>
            <Button title="Scan Fountains" onPress={scan}></Button>
        </View>
    );
};



export default BluetoothA2DP;