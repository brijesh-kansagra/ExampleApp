import React from 'react';
import {View, Button } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

const BluetoothClassic = props => {

    const scan = async () => {
        
        props.scanDevices();
        console.log("Scanning devices");
        try {
            await RNBluetoothClassic.discoverDevices().then((deviceList) => {
                console.log("Scanning completed");        
                console.log("Devices: "+deviceList);
                props.addDevices(deviceList);
            }).catch( (error) => {
                console.log("Error in Scanning devices Error "+error);
            });
        } catch (error) {
            console.log("Error scanning devices: "+error);
        }        
    }
    
    return(
        <View>
            <Button title="Scan Fountains" onPress={scan}></Button>
        </View>
    );
};



export default BluetoothClassic;