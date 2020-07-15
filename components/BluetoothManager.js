import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import RNBluetoothClassic, {
  BTEvents,
  BTCharsets,
} from 'react-native-bluetooth-classic';
import {
  Root,
  Container,
  Toast,
  Header,
  Title,
  Button,
  Right,
  Left,
  Icon,
  Body,
  StyleProvider,
} from 'native-base';
/*import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';*/

const DeviceList = ({devices, onPress, style}) => {
  console.log('DeviceList.render()');
  console.log(devices);

  return (
    <ScrollView
      style={styles.listContainer}
      contentContainerStyle={styles.container}>
      {devices.map((device, i) => {
        let bgColor = device.connected
          ? '#0f0'
          : styles.connectionStatus.backgroundColor;
        return (
          <TouchableOpacity
            key={device.id}
            style={[styles.button, style]}
            onPress={() => onPress(device)}>
            <View
              style={[styles.connectionStatus, {backgroundColor: bgColor}]}
            />
            <View style={{flex: 1}}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text>{device.address}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

class ConnectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: undefined,
      scannedData: [],
    };
  }

  componentDidMount() {
    this.onRead = RNBluetoothClassic.addListener(
      BTEvents.READ,
      this.handleRead,
      this,
    );
    //this.poll = setInterval(() => this.pollForData(), 3000);
  }

  componentWillUnmount() {
    this.onRead.remove();
    //clearInterval(this.poll);
    console.log('componentWillUnmount, Disconnecting the device');
    RNBluetoothClassic.disconnect();
  }


  sendData = async () => {
    let message = this.state.text + '\r'; // For commands
    await RNBluetoothClassic.writeToDevice(message);

    let scannedData = this.state.scannedData;
    scannedData.unshift({
      timestamp: new Date(),
      data: this.state.text,
      type: 'sent',
    });
    this.setState({text: '', scannedData});
  };

  render() {
    console.log('DeviceConnection.render() '+this.state);
    console.log('Device state is' + this.state);

    return (
      <Container>
        <Header>
          <Left>
            <Title>{this.props.device.name}</Title>
          </Left>
          <Right>
            <TouchableOpacity onPress={this.props.disconnect}>
              <Text style={[styles.toolbarButton, {color: '#F00'}]}>X</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={{flex: 1}}>
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{justifyContent: 'flex-end'}}
            inverted
            ref="scannedDataList"
            data={this.state.scannedData}
            keyExtractor={(item, index) => item.timestamp.toISOString()}
            renderItem={({item}) => (
              <View
                id={item.timestamp.toISOString()}
                style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                <Text>{item.timestamp.toLocaleDateString()}</Text>
                <Text>{item.type === 'sent' ? ' < ' : ' > '}</Text>
                <Text style={{flexShrink: 1}}>{item.data.trim()}</Text>
              </View>
            )}
          />
          <View style={[styles.horizontalContainer, {backgroundColor: '#ccc'}]}>
            <TextInput
              style={styles.textInput}
              placeholder={'Send Data'}
              value={this.state.text}
              onChangeText={text => this.setState({text})}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={() => this.sendData()}
              returnKeyType="send"
            />
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => this.sendData()}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}

export default class BluetoothManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceList: [],
      connectedDevice: undefined,
      scannedData: [],
      isDiscovering: false
    };
  }

  componentDidMount() {
    this.initialize();
    this.subs = [];

    // Re-initialize whenever a Bluetooth event occurs
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.BLUETOOTH_CONNECTED,
        device => this.onConnected(device),
        this,
      ),
    );
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.BLUETOOTH_DISCONNECTED,
        device => this.onDisconnected(device),
        this,
      ),
    );
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.CONNECTION_LOST,
        error => this.onConnectionLost(error),
        this,
      ),
    );
    this.subs.push(
      RNBluetoothClassic.addListener(
        BTEvents.ERROR,
        error => this.onError(error),
        this,
      ),
    );
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  onConnected(device) {
    Toast.show({
      text: `Connected to ${device.name}`,
      duration: 3000,
      useNativeDriver: true
    });
    this.initialize();
  }

  onDisconnected(device) {
    Toast.show({
      text: `Connection to ${device.name} was disconnected`,
      duration: 3000,
      useNativeDriver: true
    });
    this.initialize();
  }

  onConnectionLost(error) {
    Toast.show({
      text: `Connection to ${error.device.name} was lost`,
      duration: 3000,
      useNativeDriver: true
    });
    this.initialize();
  }

  onError(error) {
    Toast.show({
      text: `${error.message}`,
      duration: 3000,
      useNativeDriver: true
    });
    this.initialize();
  }

  async initialize() {
    let enabled = await RNBluetoothClassic.isEnabled();
    this.setState({ bluetoothEnabled: enabled });

    if (enabled) {
      this.refreshDevices();
    }    
  }

  async refreshDevices() {
    let newState = {
      devices: [],
      connectedDevice: undefined,
    };
   
    try {
      let connectedDevice = await RNBluetoothClassic.getConnectedDevice();
      // const discoveredDevices = await RNBluetoothClassic.discoverDevices();
      console.log('refreshDevices::connectedDevice device is');
      console.log(connectedDevice);
      newState.connectedDevice = connectedDevice;
    } catch (error) {
      try {
        console.warn(error);
        let devices = await RNBluetoothClassic.discoverDevices();

        console.log('refreshDevices::list of discovered devices are');
        console.log(devices);
        newState.deviceList = devices;
      } catch (error) {
        console.error(error.message);
      }
    }

    this.setState(newState);
  }

  async connectToDevice(device) {
    console.log(`Attempting connection to device ${device.id}`);
    try {
      await RNBluetoothClassic.setEncoding(BTCharsets.ASCII);
      let connectedDevice = await RNBluetoothClassic.connect(device.id);
      this.setState({connectedDevice});
    } catch (error) {
      console.log(`Connection to ${device.name} unsuccessful` + error.message);
      Toast.show({
        text: `Connection to ${device.name} unsuccessful`,
        duration: 3000,
        useNativeDriver: true,
      });
    }
  }

  async disconnectFromDevice() {
    await RNBluetoothClassic.disconnect();
    this.setState({connectedDevice: undefined});
  }

  async discoverDevices() {
    console.log("Attempting to discover devices...");
    let newState = {
      devices: [],
      connectedDevice: undefined
    };

    //this.setState({ isDiscovering: true }); 

    try {
      const unpaired = await RNBluetoothClassic.discoverDevices();
      console.log("Unpaired Devices");
      console.log(unpaired);
      Toast.show({
        text: `Found ${unpaired.length} unpaired devices.`,
        duration: 3000,
        useNativeDriver: true
      })
      newState.connectedDevice = unpaired;
    } catch(error) {
      console.log(error);
      Toast.show({
        text: `Error occurred while attempting to discover devices`,
        duration: 3000,
        useNativeDriver: true
      });
    } finally {
      //this.setState({ isDiscovering: false });
      this.setState(newState); 
    }
  }

  async cancelDiscoverDevices() {
    console.log(`Attempting to cancel discovery...`);

    try {
      await RNBluetoothClassic.cancelDiscovery();
      this.setState({ isDiscovering: false });
    } catch(error) {
      console.log(error);
      Toast.show({
        text: `Error occurred while attempting to cancel discover devices`,
        duration: 3000,
        useNativeDriver: true
      });
    }
  }

  refresh = () => this.refreshDevices();
  selectDevice = device => this.connectToDevice(device);
  unselectDevice = () => this.disconnectFromDevice();
  discover = () => this.discoverDevices();
  cancelDiscover = () => this.cancelDiscoverDevices();

  render() {
    console.log('BluetoothExample.render()');
    console.log(this.state);

    let connectedColor = !this.state.bluetoothEnabled
      ? styles.toolbarButton.color
      : 'green';

    let discoverFn = !this.state.isDiscovering
      ? () => this.discover()
      : () => this.cancelDiscover();

    return (
        <Root>
          {this.state.connectedDevice ? (
            <ConnectionScreen
              device={this.state.connectedDevice}
              scannedData={this.state.scannedData}
              disconnect={this.unselectDevice}
              onSend={this.onSend}
            />
          ) : (
            <Container>
              <Header>
                <Left>
                  <Title>Devices</Title>
                </Left>
                <Right>
                  <TouchableOpacity
                    onPress={this.refresh}>
                    <Icon type="Ionicons" name="md-sync" style={styles.toolbarButton} />
                  </TouchableOpacity>
                </Right>
              </Header>
              <DeviceList
                devices={this.state.deviceList}
                onPress={this.selectDevice}
              />
              <TouchableOpacity
                style={styles.startAcceptButton}
                onPress={discoverFn}
              >
                <Text style={[{ color: "#fff" }]}>
                  {this.state.isDiscovering
                    ? "Discovering (cancel)..."
                    : "Discover Devices"}
                </Text>
                <ActivityIndicator
                  size={"small"}
                  animating={this.state.isDiscovering}
                />
              </TouchableOpacity>                         
            </Container>
          )}
        </Root>
    );
  }
}

/**
 * The statusbar height goes wonky on Huawei with a notch - not sure if its the notch or the
 * Huawei but the fact that the notch is different than the status bar makes the statusbar
 * go below the notch (even when the notch is on).
 */
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  statusbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    height: APPBAR_HEIGHT,
  },
  toolbarText: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
  },
  toolbarButton: {
    fontSize: 20,
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },  
  deviceName: {
    fontSize: 16,
  },
  startAcceptButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 9,
    marginBottom: 9
  },
  connectionStatus: {
    width: 8,
    backgroundColor: '#ccc',
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
  },
});
