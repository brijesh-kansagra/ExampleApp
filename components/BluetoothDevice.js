import React, { useState } from 'react';
import {View, Button, Text} from 'react-native';
import A2dp from 'react-native-a2dp';

const BluetoothDevice = props => {

    [connected,setConnected] = useState(false);

    const connect = async () => {        
        console.log("Connecting to device: "+props.id);
        A2dp.connectA2dp(props.id).then( () => {
            console.log("Connected to the device: "+props.id);
            console.log("Starting bluetooth streaming");  
            setConnected(true);
            A2dp.startBluetoothSco().then( () => {
                console.log("Started bluetooth streaming");    
            }).catch( (error) => {
                console.log("Error starting bluetooth streaming");
            });

        }).catch((error) => {
            console.log("Error connecting device: "+error);
        });
    }

    const disconnect = async () => {
        console.log("Stopping bluetooth streaming");
        await A2dp.stopBluetoothSco().then( () => {
            console.log("Stopped bluetooth streaming");    
        }).catch( (error) => {
            console.log("Error stopping bluetooth streaming "+error);    
        });

        A2dp.disconnectA2dp().then( () => {
             console.log("Disconnected device: "+props.id);    
             setConnected(false);
        }).catch((error) => {
            console.log("Error disconnecting device: "+props.id);
        });
    }

    return(
        <View>
            <Text>{props.title}</Text>
            <View visible={!connected}>
                <Button title="Connect" enable={!connected} onPress={connect}></Button>
            </View>
            <View visible={connected}>
                <Button title="Disconnect" enable={connected} onPress={disconnect}></Button>
            </View>
        </View>
    );
};

export default BluetoothDevice;