import React from 'react';
import {View, Button, Text, Modal} from 'react-native';
import A2dp from 'react-native-a2dp';

const BluetoothA2DP = props => {

    const scan = async () => {
        console.log("Scanning devices");
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

    function componentDidMount() {
        this.scan();
    }

    return(
        <View>
            <Button title="Scan Fountains" onPress={scan}></Button>
        </View>
    );
};

export default BluetoothA2DP;