import React from 'react';
import {View, Button, Text} from 'react-native';
import A2dp from 'react-native-a2dp';

const BluetoothA2DP = props => {

    const devices = async () => {
        console.log("Fetching device list");
        let deviceList = await A2dp.deviceList();
        console.log(deviceList);
        console.log("Connecting to device: "+deviceList[0].id);
        await A2dp.connectA2dp(deviceList[0].id);
        if(Array.isArray(deviceList) && deviceList.length > 0){
            console.log("Starting bluetooth streaming");
            A2dp.startBluetoothSco();
            console.log("Stopping bluetooth streaming");
            A2dp.stopBluetoothSco();
        }else{
            console.log("Device is empty");
        }
        
    }

    return(
        <View>
            <Button title="Scan Devices" onPress={devices}></Button>
        </View>
    );
};

export default BluetoothA2DP;